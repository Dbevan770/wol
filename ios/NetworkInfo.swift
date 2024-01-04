//
//  NetworkInfo.swift
//  wol
//
//  Created by Danny on 1/1/24.
//

import Foundation

@objc(NetworkInfo) class NetworkInfo : NSObject
{
  private enum NetworkError: Error {
    case generalFailure
  }
  
  @objc static func requiresMainQueueSetup() -> Bool { return false }
  
  @objc func startPathMonitor()
  {
    let _ = PathMonitor()
    print("[NETWORK INFO] -- Path monitor initialized.")
  }
  
  @objc func getNetworkingInfo(_ activeInterface: String)
  {
    do
    {
      let netInfo = NetInfo()
      
      guard netInfo != nil else {
        throw NetworkError.generalFailure
      }
      
      try netInfo?.getNetInfo(activeInterface: activeInterface)
    } catch {
      print(error)
    }
  }
}
