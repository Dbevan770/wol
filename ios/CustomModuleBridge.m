//
//  CustomModuleBridge.m
//  wol
//
//  Created by Danny on 1/1/24.
//
#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(NetworkInfo, NSObject)

RCT_EXTERN_METHOD(startPathMonitor)

RCT_EXTERN_METHOD(getNetworkingInfo:(NSString *)activeInterface)

@end

@interface RCT_EXTERN_MODULE(NetworkModule, NSObject)

RCT_EXTERN_METHOD(sendWakeOnLan:(NSString *)broadcastIP targetMac:(NSString *)targetMac)

@end

@interface RCT_EXTERN_MODULE(RNEventEmitter, RCTEventEmitter)
  RCT_EXTERN_METHOD(supportedEvents)
@end
