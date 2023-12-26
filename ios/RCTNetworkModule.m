//
//  RCTNetworkModule.m
//  wol
//
//  Created by Danny on 12/22/23.
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NetworkModule, NSObject)

RCT_EXTERN_METHOD(sendWakeOnLan:(NSString *)broadcastIP targetMac:(NSString *)targetMac)

@end
