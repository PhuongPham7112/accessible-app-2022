//
//  SignUpViewController.swift
//  AccesSC
//
//  Created by Elaine Kodama on 2/19/22.
//

import UIKit

class SignUpViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet weak var emailTF: UITextField!
    @IBOutlet weak var passwordTF: UITextField!
    @IBOutlet weak var confirmPasswordTF: UITextField!
    @IBOutlet weak var signUpButton: UIButton!
    var auth = AuthModel.shared
    
    override func viewDidLoad() {
        super.viewDidLoad()

        emailTF.delegate = self
        passwordTF.delegate = self
        confirmPasswordTF.delegate = self
        emailTF.text = "" //start with blank lines
        passwordTF.text = ""
        confirmPasswordTF.text = ""
        signUpButton.isEnabled = false
        // Do any additional setup after loading the view.
    }

    //user can only pres sign in if text in both email and password
    func configureSignUpButton(){
        if emailTF.hasText && passwordTF.hasText && confirmPasswordTF.hasText{
            signUpButton.isEnabled = true
        }
        else{
            signUpButton.isEnabled = false
        }
    }
    @IBAction func userTappedBackground(_ sender: UITapGestureRecognizer) {
        if emailTF.isFirstResponder {
            emailTF.resignFirstResponder()
            passwordTF.becomeFirstResponder()
        }
        else if passwordTF.isFirstResponder {
            passwordTF.resignFirstResponder()
            confirmPasswordTF.becomeFirstResponder()
        }
        else {
            confirmPasswordTF.resignFirstResponder()
        }
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        if emailTF.isFirstResponder {
            emailTF.resignFirstResponder()
            passwordTF.becomeFirstResponder()
        }
        else if passwordTF.isFirstResponder {
            passwordTF.resignFirstResponder()
            confirmPasswordTF.becomeFirstResponder()
        }
        else {
            confirmPasswordTF.resignFirstResponder()
        }
        return true
    }
    @IBAction func tfEditingDidChange(_ sender: UITextField) {
        configureSignUpButton()
    }
    
    //user cannot create account for some reason
    func signUpError(){
        emailTF.text = ""
        passwordTF.text = ""
        confirmPasswordTF.text = ""
        let alert = UIAlertController(title: "Error creating account", message: nil, preferredStyle: .alert)
        let okay = UIAlertAction(title: "Okay", style: .cancel, handler: nil)
        //add the action to the alert
        alert.addAction(okay)
        //present the alert
        self.present(alert, animated: true, completion: nil)
        signUpButton.isEnabled = false
        emailTF.becomeFirstResponder()
    }
    
    @IBAction func usertappedSignUp(_ sender: UIButton) {
        confirmPasswordTF.resignFirstResponder()
        if passwordTF.text == confirmPasswordTF.text {
            if let email = emailTF.text, let password = confirmPasswordTF.text{
                auth.newUser(email: email, password: password) { (authDataResult, error) in
                    if let error = error{
                        //alert controller for error
                        print(error)
                        self.signUpError()
                    }
                }
            }
        }
        else {
            self.signUpError()
        }
    }
}
