//
//  LogInViewController.swift
//  AccesSC
//
//  Created by Elaine Kodama on 2/19/22.
//

import UIKit
import SwiftUI

class LogInViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet weak var emailTF: UITextField!
    @IBOutlet weak var passwordTF: UITextField!
    @IBOutlet weak var signInButton: UIButton!
    var auth = AuthModel.shared
    
    override func viewDidLoad() {
        super.viewDidLoad()
        emailTF.delegate = self
        passwordTF.delegate = self
        signInButton.isEnabled = false
        // Do any additional setup after loading the view.
    }
    
    func configureSignInButton(){
        if emailTF.hasText && passwordTF.hasText{
            signInButton.isEnabled = true
        }
        else{ //text view OR field does not have text
            signInButton.isEnabled = false //save button is disabled
        }
    }
    
    //hide/display keyboard once enter is clicked
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if emailTF.isFirstResponder {
            emailTF.resignFirstResponder()
            passwordTF.becomeFirstResponder()
        }
        else{
            passwordTF.resignFirstResponder()
        }
        return true
    }
    
    @IBAction func tfEditingChanged(_ sender: UITextField) {
        configureSignInButton()
    }
    
    //alert user of incorrect log in
    func incorrectLogIn(){
        let alert = UIAlertController(title: "Error logging in", message: nil, preferredStyle: .alert)
        //option to clear all will set default values
        let okay = UIAlertAction(title: "Okay", style: .cancel, handler: nil)
        //add the actions to the alert
        alert.addAction(okay)
        //present the alert
        present(alert, animated: true, completion: nil)
        
        emailTF.text = ""
        passwordTF.text = ""
        //alert controllers
        signInButton.isEnabled = false
        emailTF.becomeFirstResponder()
    }
    
    @IBAction func userTappedSignIn(_ sender: UIButton) {
        passwordTF.resignFirstResponder()
        if let email = emailTF.text, let password = passwordTF.text {
            auth.signInWithEmail(email: email, password: password) { (authDataResult, error) in
                if let error = error {
                    self.incorrectLogIn()
                }
            }
        }
    }
    
    @IBAction func userTappedBackground(_ sender: UITapGestureRecognizer) {
        if emailTF.isFirstResponder {
            emailTF.resignFirstResponder()
            passwordTF.becomeFirstResponder()
        }
        else {
            passwordTF.resignFirstResponder()
        }
    }

    @IBAction func userTappedSignUp(_ sender: UIButton) {
        performSegue(withIdentifier: "NewUserSegue", sender: self) //segue to new user page
    }


}
