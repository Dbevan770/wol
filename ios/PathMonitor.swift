//
//  NetInfo.swift
//  wol
//
//  Created by Danny on 12/30/23.
//

import Foundation
import Network

func getNetworkInterfaces()
{
  
}

private func configureNetworkMonitor()
{
  let monitor = NWPathMonitor()
  
  monitor.pathUpdateHandler = { path in
      
    if path.status != .satisfied {
      print("Device is not currently connected to any network.");
    }
    else if path.usesInterfaceType(.cellular)
    {
      print("Device is currently connected to a cellular network.")
    }
    else if path.usesInterfaceType(.wiredEthernet)
    {
      print("Device is currently connected to a network using a wired connection.")
    }
    else if path.usesInterfaceType(.loopback)
    {
      print("This is the device loopback interface.")
    }
    else if path.usesInterfaceType(.wifi)
    {
      print("This Device is connected to a network using a Wireless conncetion.")
    }
    else if path.usesInterfaceType(.other)
    {
      print("This Device is connected to a network using a connection that was not recognized.")
    }
  }
  
  monitor.start(queue: DispatchQueue.global(qos: .background))
}
