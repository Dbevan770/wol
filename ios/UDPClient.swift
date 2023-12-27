//
//  UDPClient.swift
//  wol
//
//  Created by Danny on 12/27/23.
//

import Foundation
import Network

public class UDPClient 
{
  public final let name: String;
  
  internal final var thread: DispatchQueue = DispatchQueue.main;
  internal final func initThread()
  {
    thread = DispatchQueue(label: "wake-on-lan" + ".udpclient." + name);
  }
  
  private var connection: NWConnection?
  private var parameters: NWParameters!
  private var context: NWConnection.ContentContext?;
  
  public internal(set) var host: NWEndpoint.Host;
  public internal(set) var port: NWEndpoint.Port;
  
  public init (name: String, host: NWEndpoint.Host, port: NWEndpoint.Port = 0, parameters: NWParameters? = nil, context: NWConnection.ContentContext? = nil)
  {
    self.name = name;
    
    self.host = host;
    self.port = port;
    self.context = context;
    
    initThread();
    
    let params: NWParameters
    if parameters != nil
    {
      params = parameters!;
    }
    else
    {
      params = NWParameters.udp;
    }
    self.parameters = params;
    
    connect()
  }
  
  internal final func connect()
  {
    connection = NWConnection(host: host, port: port, using: self.parameters);
    
    connection?.stateUpdateHandler = { (state) in
      switch state {
      case .ready:
        print("Connection ready")
      case .waiting(let error):
        print("Connection waiting: \(error.localizedDescription)")
      case .failed(let error):
        print("Connection failed: \(error.localizedDescription)")
      default:
        break;
      }
    }
    
    connection?.start(queue: thread);
  }
  
  public func send(data: Data, completion: @escaping () -> Void) 
  {
    connection?.send(content: data, completion: .contentProcessed(
      { sendError in
      if let error = sendError 
      {
          print("Send error: \(error.localizedDescription)")
      } 
      else
      {
          print("Data sent successfully")
      }
      completion()
  }))
  }
  
  public func closeConnection() 
  {
    connection?.cancel()
    print("Connection closed")
  }
}
