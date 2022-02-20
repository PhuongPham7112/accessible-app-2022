//
//  HostingViewController.swift
//  AccesSC
//
//  Created by Elaine Kodama on 2/20/22.
//

import UIKit
import SwiftUI

class HostingViewController: UIHostingController<UIView> {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    required init?(coder: NSCoder) {
        super.init(coder: coder, rootView: UIView())
    }
}

struct UIView: View {
    var body: some View {
        VStack {
            SwiftUIView()
        }
    }
}

struct HostingViewController_Previews: PreviewProvider{
    static var previews: some View {
        SwiftUIView()
    }
}
