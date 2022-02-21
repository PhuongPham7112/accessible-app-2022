//
//  DetailViewController.swift
//  AccesSC
//
//  Created by Elaine Kodama on 2/20/22.
//

import UIKit

class DetailViewController: UIViewController {

    @IBOutlet weak var imageView: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

//        if let image = imageView.image {
//            preferredContentSize = image.size
//        }
    }
    

    @IBAction private func doneAction(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
}
