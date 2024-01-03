//
//  NetworkInfo.swift
//  wol
//
//  Created by Danny on 1/1/24.
//

import Foundation

@objc(NetworkInfo) class NetworkInfo : NSObject
{
  @objc static func requiresMainQueueSetup() -> Bool { return false }
  
  @objc func initPathMonitor()
  {
    let monitor = PathMonitor()
    
    print("[NETWORK INFO] -- Path monitor initialized.")
  }
}
