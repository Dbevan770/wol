//
//  RCTNetworkModule.swift
//  wol
//
//  Created by Danny on 12/22/23.
//

import Foundation
import Network

// Define the network module class
@objc(NetworkModule)
class RCTNetworkModuleSwift: NSObject
{
  // Inform React Native that the main queue is not
  // needed for this native module
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  // Define the sendWakeOnLan function
  @objc(sendWakeOnLan:targetMac:)
  func sendWakeOnLan(broadcastIP: String, targetMac: String)
  {
    // Setup a new connection
    let udpClient = setupConnection(broadcastIP: broadcastIP, targetMac: targetMac)
    
    let magicPacket = createMagicPacket(targetMac: targetMac);
    
    udpClient.send(data: magicPacket)
    {
      udpClient.closeConnection();
    }
  }
  
  func setupConnection(broadcastIP: String, targetMac: String) -> UDPClient
  {
    let host = NWEndpoint.Host(broadcastIP);
    let wakeOnLanPort = NWEndpoint.Port(9);
    
    let udpClient = UDPClient(name: "client", host: host, port: wakeOnLanPort);
    
    return udpClient;
  }
  
  func createMagicPacket(targetMac: String) -> Data
  {
    // Convert the passed in MAC Address to hexadecimal bytes
    let macBytes = targetMac.split(separator: ":").compactMap { UInt8($0, radix: 16) }
    
    // Check the MAC address is 6 bytes long, if not it is invalid
    guard macBytes.count == 6 else {
        print("Invalid MAC address")
        return Data()
    }
    
    // Store the initial 6 bytes of FF FF FF FF FF FF at the beginning of the packet
    var packet = Data(repeating: 0xFF, count: 6)
    
    // Fill the remainder of the packet with 16 instances of the
    // target device mac address. This completes the magic packet
    for _ in 0..<16 {
      packet.append(contentsOf: macBytes)
    }
    
    // Return the fully formed magic packet
    return packet
  }
}
