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
  
  // Declare connection in class scope so it can be accessed
  // by each of the methods
  var connection: NWConnection?
  
  // Define the sendWakeOnLan function
  @objc(sendWakeOnLan:targetMac:)
  func sendWakeOnLan(broadcastIP: String, targetMac: String)
  {
    // Cancel any open connections before
    // invoking a new one
    cleanupConnection()
    
    // Setup a new connection
    setupConnection(broadcastIP: broadcastIP, targetMac: targetMac)
  }
  
  @objc
  func setupConnection(broadcastIP: String, targetMac: String)
  {
    // Initialize the parameters for the packet and define the endpoint
    let endpointUDP = NWEndpoint.hostPort(host: NWEndpoint.Host(broadcastIP), port: NWEndpoint.Port(9))
    
    // Store a UDP Options object
    let udpOptions = NWProtocolUDP.Options()
    
    // Create a parameters object, nil is passed in the dtls parameter
    // as we are only using UDP
    let parametersUDP = NWParameters(dtls: nil, udp: udpOptions)
    
    // Define the connection by providing the endpoint and parameters
    connection = NWConnection(to: endpointUDP, using: parametersUDP)
    
    // Create a state handler to track the current state of the connection
    connection?.stateUpdateHandler = { state in
      switch state {
      case .ready:
        print("Connection ready")
      case .waiting(let error):
        print("Connection waiting: \(error.localizedDescription)")
      case .failed(let error):
        print("Connection failed: \(error.localizedDescription)")
        self.cleanupConnection()
      default:
        break
      }
    }
    
    // Create a backend thread
    let queue = DispatchQueue(label: "com.example.queue")
    
    // Create an asynchronous execution block on the backend thread to
    // send the packet
    queue.async
    {
      // Start the connection on the thread
      self.connection?.start(queue: queue)
      
      // Store the magic packet
      let magicPacket = self.createMagicPacket(targetMac: targetMac)
      
      // Send the packet to the endpoint and check whether it was successful
      self.connection?.send(content: magicPacket, completion: .contentProcessed({ error in
        if let error = error {
          print("Error sending data: \(error.localizedDescription)")
        } else {
          print("Magic packet sent!")
        }
        self.cleanupConnection()
      }))
    }
  }
  
  @objc
  func cleanupConnection()
  {
    // Cancel open connection and set connection to nil
    connection?.cancel()
    connection = nil
  }
  
  @objc
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
