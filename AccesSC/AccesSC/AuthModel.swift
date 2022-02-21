//
//  File.swift
//  AccesSC
//
//  Created by Elaine Kodama on 2/19/22.
//

import UIKit
import Foundation
import FirebaseAuth

class AuthModel {
    internal var currUser: User?
    static let shared = AuthModel()
    
    func signInWithEmail(email: String, password: String, completionHandler: @escaping (AuthDataResult?, Error?) -> Void) {
        // once google comes back and the user is verified with google, you will have a authcredential object
        Auth.auth().signIn(withEmail: email, password: password) { (authDataResult, error) in
            completionHandler(authDataResult, error)
        }
    }

    //user creates a new profile with an email and password
    func newUser(email: String, password: String, completionHandler: @escaping (AuthDataResult?, Error?) -> Void){
        Auth.auth().createUser(withEmail: email, password: password) { (authDataResult, error) in
            completionHandler(authDataResult, error) //switch view controllers, or display error message
        }
    }
    
    // user logs out
    func signOut(){
        do{
            try Auth.auth().signOut()
            print("logged out")
        } catch let error as NSError{
            print("Error signing out", error)
        }
    }
    
    //check to see if user is logged in or not
    func listenerHelper() {
        Auth.auth().addStateDidChangeListener{ (auth, user) in
        
            if let user = user{
                self.currUser = user
                /// Make the root view controller your home screen
                let viewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(identifier: "MapView")
                UIApplication.shared.windows[0].rootViewController = viewController
                UIApplication.shared.windows[0].makeKeyAndVisible()
            }
            else{
                // Make the root view controller your login page
                self.currUser = nil
                let viewController = UIStoryboard(name: "Main", bundle: nil).instantiateViewController(identifier: "loginVC")
                UIApplication.shared.windows[0].rootViewController = viewController
                UIApplication.shared.windows[0].makeKeyAndVisible()
            }
        }
    }
}
