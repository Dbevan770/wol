//
//  NetInfo.swift
//  wol
//
//  Created by Danny on 12/30/23.
//

import Foundation

public class NetInfo
{
  // Network Information
  internal final var host: String? // Interface's assigned IP Address [i.e. 192.168.1.1]
  internal final var broadcast: String? // The broadcast address for the subnet the interface belongs to [i.e. 192.168.1.255]
  internal final var netmask: String? // The netmask for the interface [i.e. 255.255.255.0]
  internal final var interface: String? // The name of the interface [i.e. en0]
  
  // Pointers
  private var ifaddr: UnsafeMutablePointer<ifaddrs>? = nil;
  private var ifa: UnsafeMutablePointer<ifaddrs>;
  private var prevPtr: UnsafeMutablePointer<ifaddrs>? = nil;
  private var nextPtr: UnsafeMutablePointer<ifaddrs>? = nil;
  private var addrPtr: UnsafeMutablePointer<sockaddr>? = nil;
  private var dstAddrPtr: UnsafeMutablePointer<sockaddr>? = nil;
  private var maskPtr: UnsafeMutablePointer<sockaddr>? = nil;
  private var infPtr: UnsafeMutablePointer<CChar>? = nil;
  
  // Pointees
  private var addr: sockaddr? = nil;
  private var dstAddr: sockaddr? = nil;
  private var mask: sockaddr? = nil;
  
  public init?()
  {
    if getifaddrs(&self.ifaddr) == 0 {
      self.ifa = self.ifaddr!;
    } else {
      return nil;
    }
  }
  
  public func getNetInfo(activeInterface: String)
  {
    guard let initialIfa = ifaddr else {
      self.log(msg: "Head pointer does not match the first pointer in the interfaces linked list. Exiting...")
      return
    }
    
    // Added prevPtr check to prevent infinite loops
    for ifa in sequence(first: initialIfa, next: { $0.pointee.ifa_next })
    {
      // Immediately check if the current interface is the passed in
      // active interface.
      infPtr = ifa.pointee.ifa_name
      let interfaceName = String(cString: infPtr!)
      
      guard interfaceName == activeInterface else {
        continue
      }
      
      // Set up each Ptr with its initial value
      addrPtr = ifa.pointee.ifa_addr
      dstAddrPtr = ifa.pointee.ifa_dstaddr
      maskPtr = ifa.pointee.ifa_netmask
      
      // Store the sockaddrs of each pointer
      addr = addrPtr != nil ? addrPtr?.pointee : nil
      dstAddr = dstAddrPtr != nil ? dstAddrPtr?.pointee : nil
      mask = maskPtr != nil ? maskPtr?.pointee : nil
            
      guard validateNetFamily() else {
        continue
      }
      
      if (!getHostName())
      {
        print("Failed to get hostname for the current interface. Continuing anyway...");
      }
      
      if (!getBroadcast())
      {
        print("FATAL ERROR: Did not resolve broadcast address. User will need to provide it manually.")
        break
      }
      
      continue
    }
    
    cleanup()
  }
  
  private func getHostName() -> Bool
  {
    var hostname = [CChar](repeating: 0, count: Int(NI_MAXHOST))
    
    if (getnameinfo(&addr!, socklen_t((addr?.sa_len)!), &hostname, socklen_t(hostname.count), nil, socklen_t(0), NI_NUMERICHOST)) != 0
    {
      print("getnameinfo Failed to resolve hostname.");
      return false
    }
    
    let hostString = String(validatingUTF8: hostname)
    
    guard hostString != nil else {
      print("Failed to validate hostname CChar array as a String.");
      return false
    }
    
    host = hostString
    return true
  }
  
  private func getBroadcast() -> Bool
  {
    let socklen = dstAddr != nil ? dstAddr?.sa_len : nil
    
    guard socklen != nil else {
      return false
    }
    
    var broadcastName = [CChar](repeating: 0, count: Int(NI_MAXHOST))
    
    if getnameinfo(&dstAddr!,
                   socklen_t(socklen ?? 0),
                   &broadcastName,
                   socklen_t(broadcastName.count),
                   nil, socklen_t(0),
                   NI_NUMERICHOST) != 0
    {
      print("getnameinfo Failed to resolve broadcast address.")
      return false
    }
    
    let broadcastAddr = String(validatingUTF8: broadcastName)
    
    guard broadcastAddr != nil else {
      print("Failed to validate broadcast CChar array as a String.")
      return false
    }
    
    broadcast = broadcastAddr
    return true
  }
  
  private func validateNetFamily() -> Bool
  {
    guard ((addr?.sa_family)! == UInt8(AF_INET) || (addr?.sa_family)! == UInt8(AF_INET6)) else {
      print("Current interface address is not IPv4 or IPv6 and is not supported.");
      return false
    }
    
    return true
  }
  
  private func log(msg: String)
  {
    print("[NET INFO] -- \(msg)")
  }
  
  private func cleanup()
  {
    freeifaddrs(ifaddr)
  }
}
