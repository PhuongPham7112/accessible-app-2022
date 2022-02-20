//
//  BridgeAnnotation.swift
//  AccesSC
//
//  Created by Elaine Kodama on 2/20/22.
//

import UIKit
import MapKit

class BridgeAnnotation: NSObject, MKAnnotation {
    
    // This property must be key-value observable, which the `@objc dynamic` attributes provide.
    @objc dynamic var coordinate = CLLocationCoordinate2D(latitude: 34.02081, longitude: -118.28566)
    
    // Required if you set the annotation view's `canShowCallout` property to `true`
    var title: String? = NSLocalizedString("BRIDGE_TITLE", comment: "Bridge annotation")
    
    // This property defined by `MKAnnotation` is not required.
    var subtitle: String? = NSLocalizedString("BRIDGE_SUBTITLE", comment: "Bridge annotation")
}
