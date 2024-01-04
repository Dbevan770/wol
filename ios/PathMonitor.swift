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
  private var monitor: NWPathMonitor;
  
  // Stored reference to the currently connected path
  internal final var connectedPath: NWPath?;
  
  // Define and initialize a background thread for path monitoring
  internal final var thread: DispatchQueue = DispatchQueue.global(qos: .background);
  
  private var event = RNEventEmitter.Event(
    success: false,
    payload: nil,
    error: nil
  )
  
  private enum EventType {
    case success
    case error
  }
  
  public init()
  {
    self.monitor = NWPathMonitor()
    
    initPathMonitor()
  }
  
  private func initPathMonitor()
  {
    // Initializes a path update handler to find the active network connection
    self.monitor.pathUpdateHandler = { path in
      var availableInterfaces = path.availableInterfaces.count > 0 ? path.availableInterfaces : nil
      
      self.log(msg: "Path state changed for the following network path:\n\tSTATUS:\t\t\t\t\(path.status)\n\tINTERFACE:\t\t\t\t  \(availableInterfaces?[0].name ?? "NONE")\n\tPROTOCOL:\t\t\t\t \(path.supportsIPv4 ? "ipv4" : "ipv6")\n\tDNS:\t\t\t\t\t \(path.supportsDNS)\n\tTYPE:\t\t\t\t\t \(path.usesInterfaceType(.wifi) ? "WiFi" : path.usesInterfaceType(.wiredEthernet) ? "Wired Ethernet" : "Unsupported")")
      // If a path status is unsatisfied it is not connected and can be ignored
      // If there are no connected paths at all this code block executes
      if path.status != .satisfied
      {
        self.sendNetworkEvent(eventType: EventType.error, eventPayload: nil, eventError: "The device is not currently connected to any network.")
      }
      else if (!path.usesInterfaceType(.wifi) && !path.usesInterfaceType(.wiredEthernet))
      {
        self.sendNetworkEvent(eventType: EventType.error, eventPayload: nil, eventError: "The device is not connected to a supported network type. Wake On LAN only supports WiFi and Wired Networks.")
      }
      
      self.sendNetworkEvent(eventType: EventType.success, eventPayload: availableInterfaces?[0].name ?? "Connection successful but not interface was found.", eventError: nil)
    }
    
    self.monitor.start(queue: thread)
    log(msg: "Monitoring network paths for changes in state...");
  }
  
  private func sendNetworkEvent(eventType: EventType, eventPayload: Any?, eventError: String?)
  {
    switch eventType
    {
    case .success:
      self.event.success = true
      self.event.payload = eventPayload
      self.event.error = nil
      self.log(msg: "\(String(describing: eventPayload))")
    case .error:
      self.event.success = false
      self.event.payload = nil
      self.event.error = eventError
      self.log(msg: (eventError != nil) ? eventError! : "An unknown error occured.")
    }
    
    self.notifyListeners()
  }

  private func notifyListeners()
  {
    log(msg: "Notifying listeners of Networking Event...")
    RNEventEmitter.emitter.sendEvent(withName: "Networking", body: self.event.toDictionary())
  }
  
  private func log(msg: String)
  {
    print("[PATH MONITOR] -- \(msg)")
  }
  
  public func stopMonitoring()
  {
    self.monitor.cancel()
    log(msg: "Monitoring has stopped.")
  }
}
