//
//  NetworkInfoBridge.m
//  wol
//
//  Created by Danny on 1/1/24.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(NetworkInfo, NSObject)

@end

@interface RCT_EXTERN_MODULE(NetworkModule, NSObject)

RCT_EXTERN_METHOD(getNetworkInfo)

RCT_EXTERN_METHOD(sendWakeOnLan:(NSString *)broadcastIP targetMac:(NSString *)targetMac)

@end
