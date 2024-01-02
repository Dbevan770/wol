//
//  PathMonitor.swift
//  wol
//
//  Created by Danny on 12/30/23.
//

import Foundation
import Network

public class PathMonitor
{
  // Instance of the library monitor
  private var monitor: NWPathMonitor?;
  
  // Stored reference to the currently connected path
  internal final var connectedPath: NWPath?;
  
  // Define and initialize a background thread for path monitoring
  internal final var thread: DispatchQueue = DispatchQueue.main;
  internal final func initThread()
  {
    thread = DispatchQueue.global(qos: .background);
  }
  
  public init()
  {
    initPathMonitor()
  }
  
  private func initPathMonitor()
  {
    // Initialize background thread for the monitor.
    initThread()
    
    // Create and store a reference to a new NWPathMonitor
    self.monitor = NWPathMonitor()
    
    // Initialize an Event with default values
    var event = RNEventEmitter.Event(
      success: false, 
      payload: nil,
      error: nil
    )
    
    // Initializes a path update handler to find the active network connection
    monitor?.pathUpdateHandler = { path in
      self.log(msg: "Path state changed for the following network path:\n\tSTATUS:\t\t\t\t\(path.status)\n\tINTERFACE:\t\t\t\t  \(path.availableInterfaces[0].name)\n\tPROTOCOL:\t\t\t\t \(path.supportsIPv4 ? "ipv4" : "ipv6")\n\tDNS:\t\t\t\t\t \(path.supportsDNS)\n\tTYPE:\t\t\t\t\t \(path.usesInterfaceType(.wifi) ? "WiFi" : path.usesInterfaceType(.wiredEthernet) ? "Wired Ethernet" : "Unsupported")")
      // If a path status is unsatisfied it is not connected and can be ignored
      // If there are no connected paths at all this code block executes
      if path.status != .satisfied
      {
        event.success = false
        event.error = "The device is not currently connected to any network."
        self.log(msg: "\(event.error!) -- \(path.unsatisfiedReason)")
        self.notifyListeners(event: event)
      }
      else if (!path.usesInterfaceType(.wifi) && !path.usesInterfaceType(.wiredEthernet))
      {
        event.success = false
        event.error = "The device is not connected to a supported network type. Wake On LAN only supports WiFi and Wired Networks."
        self.log(msg: event.error!)
        self.notifyListeners(event: event)
      }
      else
      {
        event.success = true
        event.payload = "Device is connected to a network using a supported interface type"
        self.log(msg: "Connected.")
        self.connectedPath = path
        self.notifyListeners(event: event)
        self.stopMonitoring()
      }
    }
    
    monitor?.start(queue: thread)
    log(msg: "Monitoring network paths for changes in state...");
  }

  public func notifyListeners (event: RNEventEmitter.Event)
  {
    log(msg: "Notifying listeners of Networking Event...")
    RNEventEmitter.emitter.sendEvent(withName: "Networking", body: event.toDictionary())
  }
  
  public func stopMonitoring()
  {
    monitor?.cancel()
    log(msg: "Monitoring has stopped.")
  }
  
  private func log(msg: String)
  {
    print("[PATH MONITOR] -- \(msg)")
  }
}
