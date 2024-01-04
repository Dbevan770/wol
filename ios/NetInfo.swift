//
//  NetInfo.swift
//  wol
//
//  Created by Danny on 12/30/23.
//

import Foundation

public class NetInfo
{
  struct NetworkInfo {
    var host: String;
    var broadcast: String;
    var netmask: String;
    var interface: String;
    
    func toDictionary() -> [String: Any]
    {
      var dict = [String: Any]()
      dict["host"] = host
      dict["broadcast"] = broadcast
      dict["netmask"] = netmask
      dict["interface"] = interface
      return dict
    }
  }
  
  private var eventPayload = NetworkInfo(
    host: "",
    broadcast: "",
    netmask: "",
    interface: ""
  )
  
  // Pointers
  private var ifaddr: UnsafeMutablePointer<ifaddrs>?;
  private static var maxHost: [CChar] = [CChar](repeating: 0, count: Int(NI_MAXHOST));
  
  private var event = RNEventEmitter.Event(
    success: false,
    payload: nil,
    error: nil
  )
  
  private enum EventType {
    case success
    case error
  }
  
  private enum NetInfoError: Error {
    case pointerMismatch
    case missingInterface
    case missingSocket
    case invalidAddress
    case invalidProtocol
    case nameResolutionFailed
    case stringConversionFailure
    
    var localizedDescription: String
    {
      switch self
      {
      case .pointerMismatch:
        return "Pointer mismatch error occured."
      case .missingInterface:
        return "No interfaces found. Ensure your device networking card is functioning properly and try again."
      case .missingSocket:
        return "Socket is null and will not resolve."
      case .invalidAddress:
        return "Interface does not have an assigned address which is required to indentify the protocol."
      case .invalidProtocol:
        return "Interface protocol is not IPv4 or IPv6 and is not supported."
      case .nameResolutionFailed:
        return "Failed to parse human readable name from passed in socket."
      case .stringConversionFailure:
        return "Failed to convert socket to String."
      }
    }
  }
  
  public init?()
  {
    guard getifaddrs(&self.ifaddr) == 0 else {
      return nil
    }
  }
  
  public func getNetInfo(activeInterface: String) throws
  {
    guard let initialIfa = ifaddr else {
      throw NetInfoError.pointerMismatch
    }

    for ifa in sequence(first: initialIfa, next: { $0.pointee.ifa_next })
    {
      // Immediately check if the current interface is the passed in
      // active interface.
      guard let inf = ifa.pointee.ifa_name else {
        throw NetInfoError.missingInterface
      }
      
      var interfaceName = String(cString: inf)
      
      guard interfaceName == activeInterface else {
        continue
      }
      
      guard let addrPtr = ifa.pointee.ifa_addr else {
        throw NetInfoError.invalidAddress
      }
      
      let proto = addrPtr.pointee.sa_family

      guard (proto == AF_INET || proto == AF_INET6) else {
        continue
      }
      
      let hostSocket = ifa.pointee.ifa_addr
      let broadcastSocket = ifa.pointee.ifa_dstaddr
      let netmaskSocket = ifa.pointee.ifa_netmask
      
      print("Processing Hostname")
      eventPayload.host = try getNameInfo(socket: hostSocket?.pointee)
      print("Processing Broadcast")
      eventPayload.broadcast = try getNameInfo(socket: broadcastSocket?.pointee)
      print("Processing Netmask")
      eventPayload.netmask = try getNameInfo(socket: netmaskSocket?.pointee)
      eventPayload.interface = interfaceName
    }
    
    self.sendEvent(eventType: EventType.success, eventPayload: eventPayload.toDictionary(), eventError: nil)
    
    // Cleanup by dealloc'ing the memory used to gather this info
    self.cleanup()
  }
  
  private func getNameInfo(socket: sockaddr?) throws -> String
  {
    guard var ptr = socket else {
      return "Undefined"
    }
    
    let result = getnameinfo(&ptr, socklen_t(ptr.sa_len), &NetInfo.maxHost, socklen_t(NetInfo.maxHost.count), nil, socklen_t(0), NI_NUMERICHOST)
    
    guard result == 0 else {
      return "Undefined"
    }
    
    guard let nameString = String(validatingUTF8: NetInfo.maxHost) else {
      throw NetInfoError.stringConversionFailure
    }
    
    return nameString
  }
  
  private func sendEvent(eventType: EventType, eventPayload: Any?, eventError: String?)
  {
    print("Build event for notification")
    switch eventType
    {
    case .success:
      self.event.success = true
      self.event.payload = eventPayload
      self.event.error = nil
    case .error:
      self.event.success = false
      self.event.payload = nil
      self.event.error = eventError
    }
    
    self.notifyListeners()
  }
  
  private func notifyListeners()
  {
    print("Notifying listeners!")
    RNEventEmitter.emitter.sendEvent(withName: "NetworkInfo", body: self.event.toDictionary())
  }
  
  private func cleanup()
  {
    freeifaddrs(ifaddr)
  }
}
