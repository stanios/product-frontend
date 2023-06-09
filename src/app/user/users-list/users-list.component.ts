import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserAPIList } from '../user.interfaces';

import { Subscription } from  'rxjs'

import { orderBy } from 'lodash-es'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}
  

  loading = false;
  userList : User[] = []
  subscription: Subscription | undefined

  usernameSortType: 'asc' | 'desc' = 'asc'
  firstNameSortType: 'asc' | 'desc' = 'asc'
  lastNameSortType: 'asc' | 'desc' = 'asc'


  ngOnInit(): void {
    console.log('starting "findAll" API call')
    this.loading = true;
    this.subscription = this.userService.findAll().subscribe({
      next: (apiData: UserAPIList) => {
        const {status, data} = apiData
        this.userList = data;
        console.log(status)
        console.log(data)
      },
      error: (error) => { 
        this.loading = false;
        console.log(error)
      },
      complete: () => {
        this.loading = false;
        console.log('API call completed')
      },
    })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleSort(key: string) {
    switch (key) {
      case 'username':
        this.usernameSortType = this.usernameSortType === 'asc' ? 'desc' : 'asc'
        this.userList = orderBy(this.userList, [key], [this.usernameSortType])
        break;
        case 'name':
          this.firstNameSortType = this.firstNameSortType === 'asc' ? 'desc' : 'asc'
          this.userList = orderBy(this.userList, [key], [this.firstNameSortType])
          break;  
          case 'surname':
            this.lastNameSortType = this.lastNameSortType === 'asc' ? 'desc' : 'asc'
            this.userList = orderBy(this.userList, [key], [this.lastNameSortType])
            break;  
      default:
        break;
    }
  }

}
