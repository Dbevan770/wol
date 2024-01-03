//
//  RNEventEmitter.swift
//  wol
//
//  Created by Danny on 1/1/24.
//

import Foundation
import React

@objc(RNEventEmitter)
open class RNEventEmitter : RCTEventEmitter
{
  public struct Event 
  {
    var success: Bool;
    var payload: Any?;
    var error: String?;
    
    func toDictionary() -> [String: Any]
    {
      var dict = [String: Any]()
      dict["success"] = success
      if let payload = payload { dict["payload"] = payload }
      if let error = error { dict["error"] = error }
      return dict
    }
  }
  
  open override func supportedEvents() -> [String]! {
    ["Networking"]
  }
  
  public static var emitter: RCTEventEmitter!
  
  override init()
  {
    super.init()
    RNEventEmitter.emitter = self
  }
  
  @objc public override static func requiresMainQueueSetup() -> Bool { return false }
}
