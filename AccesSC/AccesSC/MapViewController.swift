/*
See LICENSE folder for this sample’s licensing information.

Abstract:
The primary view controller containing the `MKMapView`, as well as adding and removing `MKMarkerAnnotationView` through its toolbar.
*/

import UIKit
import MapKit

class MapViewController: UIViewController {

    @IBOutlet private weak var mapView: MKMapView!
    
    private var allAnnotations: [MKAnnotation]?
    
    private var displayedAnnotations: [MKAnnotation]? {
        willSet {
            if let currentAnnotations = displayedAnnotations {
                mapView.removeAnnotations(currentAnnotations)
            }
        }
        didSet {
            if let newAnnotations = displayedAnnotations {
                mapView.addAnnotations(newAnnotations)
            }
            centerMapOnUSC()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        registerMapAnnotationViews()
        
        //iterate through list
        //create an annotation with coordinates title and subtitle
        //append to allAnnotations
        
        let annenberg = CustomAnnotation(coordinate: CLLocationCoordinate2D(latitude: 34.01822, longitude: -118.28414), title: NSLocalizedString("Wallis Annenberg Building", comment: "Bathroom"))
        let viterbi = CustomAnnotation(coordinate: CLLocationCoordinate2D(latitude: 34.02084, longitude: -118.28938), title: NSLocalizedString("Viterbi School of Engineering", comment: "Flower annotation"))
        let doheny = CustomAnnotation(coordinate: CLLocationCoordinate2D(latitude: 34.02045, longitude: -118.28368), title: NSLocalizedString("Doheny Memorial Library", comment: "Flower annotation"))
        let leavey = CustomAnnotation(coordinate: CLLocationCoordinate2D(latitude: 34.02205, longitude: -118.28274), title: NSLocalizedString("Leavey Library", comment: "Flower annotation"))
        // Create the array of annotations and the specific annotations for the points of interest.
        allAnnotations = [annenberg, viterbi, doheny, leavey]
        displayedAnnotations = allAnnotations
        
        // Dispaly all annotations on the map.
//        showAllAnnotations(self)
    }
    
    @IBAction func logOutPressed(_ sender: UIButton) {
        AuthModel.shared.signOut()
    }
    
    /// Register the annotation views with the `mapView` so the system can create and efficently reuse the annotation views.
    /// - Tag: RegisterAnnotationViews
    private func registerMapAnnotationViews() {
        mapView.register(MKAnnotationView.self, forAnnotationViewWithReuseIdentifier: NSStringFromClass(CustomAnnotation.self))
    }
    
    private func centerMapOnUSC() {
        let span = MKCoordinateSpan(latitudeDelta: 0.02, longitudeDelta: 0.02)
        let center = CLLocationCoordinate2D(latitude: 34.02081, longitude: -118.28556)
        mapView.setRegion(MKCoordinateRegion(center: center, span: span), animated: true)
    }
        
    private func displayOne(_ annotationType: AnyClass) {
        let annotation = allAnnotations?.first { (annotation) -> Bool in
            return annotation.isKind(of: annotationType)
        }
        
        if let oneAnnotation = annotation {
            displayedAnnotations = [oneAnnotation]
        } else {
            displayedAnnotations = []
        }
    }
}

extension MapViewController: MKMapViewDelegate {
    
    func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        
        guard !annotation.isKind(of: MKUserLocation.self) else {
            // Make a fast exit if the annotation is the `MKUserLocation`, as it's not an annotation view we wish to customize.
            return nil
        }
        
        var annotationView: MKAnnotationView?
        
        if let annotation = annotation as? CustomAnnotation {
            annotationView = setupCustomAnnotationView(for: annotation, on: mapView)
        }
        return annotationView

    }
    
    private func setupCustomAnnotationView(for annotation: CustomAnnotation, on mapView: MKMapView) -> MKAnnotationView {
        /*return mapView.dequeueReusableAnnotationView(withIdentifier: NSStringFromClass(CustomAnnotation.self), for: annotation)*/
        let identifier = NSStringFromClass(CustomAnnotation.self)
        let view = mapView.dequeueReusableAnnotationView(withIdentifier: "AnnotId", for: annotation)
        if let markerAnnotationView = view as? MKMarkerAnnotationView {
            markerAnnotationView.animatesWhenAdded = true
            markerAnnotationView.canShowCallout = true
            markerAnnotationView.markerTintColor = UIColor(named: "internationalOrange")
            
            /*
             Add a detail disclosure button to the callout, which will open a new view controller or a popover.
             When the detail disclosure button is tapped, use mapView(_:annotationView:calloutAccessoryControlTapped:)
             to determine which annotation was tapped.
             If you need to handle additional UIControl events, such as `.touchUpOutside`, you can call
             `addTarget(_:action:for:)` on the button to add those events.
             */
            let rightButton = UIButton(type: .detailDisclosure)
            markerAnnotationView.calloutOffset = CGPoint(x: -5, y: 5)
            markerAnnotationView.rightCalloutAccessoryView = rightButton
        }
        
        return view
    }
    
    /*
    /// Called whent he user taps the disclosure button in the bridge callout.
    func mapView(_ mapView: MKMapView, annotationView view: MKAnnotationView, calloutAccessoryControlTapped control: UIControl) {
        
        // This illustrates how to detect which annotation type was tapped on for its callout.
        if let annotation = view.annotation, annotation.isKind(of: CustomAnnotation.self) {
            print("Tapped Golden Gate Bridge annotation accessory view")
            
            if let detailNavController = storyboard?.instantiateViewController(withIdentifier: "DetailNavController") {
                detailNavController.modalPresentationStyle = .popover
                let presentationController = detailNavController.popoverPresentationController
                presentationController?.permittedArrowDirections = .any
                
                // Anchor the popover to the button that triggered the popover.
                presentationController?.sourceRect = control.frame
                presentationController?.sourceView = control
                
                present(detailNavController, animated: true, completion: nil)
            }
        }
    }
    
    func mapView(_ mapView: MKMapView, didSelect view: MKAnnotationView)
 {
     print("Pin clicked");
    }
    
    /// The map view asks `mapView(_:viewFor:)` for an appropiate annotation view for a specific annotation.
    /// - Tag: CreateAnnotationViews
    func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -> MKAnnotationView? {
        
        guard !annotation.isKind(of: MKUserLocation.self) else {
            // Make a fast exit if the annotation is the `MKUserLocation`, as it's not an annotation view we wish to customize.
            return nil
        }
        
        var annotationView: MKAnnotationView?
        
        if let annotation = annotation as? CustomAnnotation {
            annotationView = setupCustomAnnotationView(for: annotation, on: mapView)
            annotationView?.canShowCallout = true;
        }
        
        return annotationView
    }
    
    /// - Tag: CalloutButton
    private func setupCustomAnnotationView(for annotation: CustomAnnotation, on mapView: MKMapView) -> MKAnnotationView {
        /*return mapView.dequeueReusableAnnotationView(withIdentifier: NSStringFromClass(CustomAnnotation.self), for: annotation)*/
        let identifier = NSStringFromClass(CustomAnnotation.self)
        let view = mapView.dequeueReusableAnnotationView(withIdentifier: "AnnotId", for: annotation)
        if let markerAnnotationView = view as? MKMarkerAnnotationView {
            markerAnnotationView.animatesWhenAdded = true
            markerAnnotationView.canShowCallout = true
            markerAnnotationView.markerTintColor = UIColor(named: "internationalOrange")
            
            /*
             Add a detail disclosure button to the callout, which will open a new view controller or a popover.
             When the detail disclosure button is tapped, use mapView(_:annotationView:calloutAccessoryControlTapped:)
             to determine which annotation was tapped.
             If you need to handle additional UIControl events, such as `.touchUpOutside`, you can call
             `addTarget(_:action:for:)` on the button to add those events.
             */
            let rightButton = UIButton(type: .detailDisclosure)
            markerAnnotationView.calloutOffset = CGPoint(x: -5, y: 5)
            markerAnnotationView.rightCalloutAccessoryView = rightButton
        }
        
        return view
    }
     */
}
