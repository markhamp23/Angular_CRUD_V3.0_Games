import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  users: any = [];
  userValidate: boolean = false;

 
    username: '';
    password: '';
  


  constructor(private authenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers;
  }

  getUsers() {
    this.authenticationService.getUsers()
      .subscribe(
        res => {
          this.users = res;
        },
        err => console.error(err)
      );
  }

  validateUser() {
    this.authenticationService.getUser(this.username,this.password)
      .subscribe(
        res => {
          console.log(res);
          this.getUsers();
          this.userValidate = true;
        },
        err => console.error(err)
      )
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
}
