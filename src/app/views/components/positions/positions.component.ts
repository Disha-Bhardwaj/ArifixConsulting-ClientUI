import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../common/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $: any;
class Structure {
  jobTitle?: string;
  editTitle?: boolean;
  showStep?: string;
  showEditBtn?: boolean;
  monOpen?: Date;
  monClose?: Date;
  tuesOpen?: Date;
  tuesClose?: Date;
  wedOpen?: Date;
  wedClose?: Date;
  thursOpen?: Date;
  thursClose?: Date;
  friOpen?: Date;
  friClose?: Date;
  satOpen?: Date;
  satClose?: Date;
  sunOpen?: Date;
  sunClose?: Date;
  employeeType?: string;
  permissions?: Array<any>;
  serviceList?: Array<any>;
}

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  addPosition = false
  showStep = ''
  newPermissionForm!: FormGroup;
  servicesForm!: FormGroup;
  openingTimeForm!: FormGroup;
  employeeTypeForm!: FormGroup;
  categoryCount = 0
  showWizard = false
  jobTitle = ''
  serviceCount = 0
  savedBtnDis = false
  arrayItemList: Structure[] = [];

  constructor(public dialog: MatDialog, private toastr: ToastrService, private fb: FormBuilder,
    private cookies: CookieService, private route: Router) { }

  ngOnInit(): void {
    if (this.cookies.get('wizardStart') == 'true') {
      this.showWizard = true
    }
    $('.select').css('background-color','#ffffff !important')
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
    // let elw = document.getElementById('MainNavBar');
    // elw!.scrollIntoView();
  }
  adjustWidth(value: any, steps: any) {
    $('#PosSelect').css('width', value.length * 10 + 20 + 'px')
  }
 
  validatePriceField(value: any) {
    var reg = new RegExp('^[0-9]*$');
    let match = reg.test(value)
    if (!match) {
      this.toastr.error('Only numbers are allowed in Price field', '', {
        timeOut: 3000,
      });
      this.savedBtnDis = true
    }
    else {
      this.savedBtnDis = false
    }
  }

 

  // wizard
  nextWizard() {
    this.route.navigateByUrl('/staff')
  }
  finishWizard() {
    this.cookies.set('wizardStart', 'false')
    this.showWizard = false
  }
  // open dialog
  openDialog(value: any) {
    this.dialog.open(DialogComponent, {
      data: {
        fromPage: value,
      },
    });
  }


  // testing

  // add new position
  addNewPosition() {
    this.arrayItemList.push({
      jobTitle: '',
      editTitle: true,
      showStep: '',
      showEditBtn: false,
      employeeType: '',
      permissions: [{ perKey: '' }],
      serviceList: [
        {
          category: '',
          serList: [
            {
              service: '',
              time: null,
              price: ''
            }
          ]
        }
      ]
    })
  }
  // remove position
  removePosition(index: any) {
    this.arrayItemList.splice(index, 1)
  }
  // click on next button
  clickOnNextBTN(item: any, index: any, goTO: any) {
    if (goTO == 'goToSchedule') {
      if (item.jobTitle.length > 0) {
        item.editTitle = false;
        item.showStep = 'scheduleStep';
        item.showEditBtn = true
      } else {
        this.toastr.error('Please enter the Job title', 'Error', {
          timeOut: 3000,
        });
      }
    }
    //schedule check
    else if(goTO == 'goToPermission'){
      if (item.monClose < item.monOpen
        || item.tuesClose < item.tuesOpen
        || item.wedClose < item.wedOpen
        || item.thursClose < item.thursOpen
        || item.friClose < item.friOpen
        || item.satClose < item.satOpen
        || item.sunClose < item.sunOpen) {
        this.toastr.error('Closing timings should be greater then Opening timings', 'Error', {
          timeOut: 3000
        });
      } else {
        this.toastr.success('Opening timings has been saved', '', {
          timeOut: 3000,
        });
        item.showStep = 'permissionStep'
      }
    }
    // permission check
    else if (goTO == 'goToEmployeeType') {
      let valid = false
      item.permissions.forEach((element: any) => {
        if (element.perKey == '') {
          valid = false
        } else {
          valid = true
        }
      });
      if (valid) {
        item.showStep = 'employeeTypeStep'
      } else {
        this.toastr.error('Please select the permissions', 'Error', {
          timeOut: 3000,
        });
      }
    }
    // employee type check
    else if (goTO == 'goToService') {
      if (item.employeeType != '') {
        item.showStep = 'serviceStep'
      } else {
        this.toastr.error('Please select the employee type', 'Error', {
          timeOut: 3000,
        });
      }

    }
    // service type check
    else if (goTO == 'goToEnd') {
      let valid = false
      item.serviceList.forEach((element: any) => {
        if (element.category == '') {
          valid = false
          return
        }
        else {
          element.serList.forEach((ele: any) => {
            if (ele.service == '' || ele.time == null || ele.price == '') {
              valid = false
              return
            } else {
              valid = true
            }
          })
        }
      });
      if (valid) {
        this.toastr.success('Details are saved successfully', '', {
          timeOut: 3000,
        });
        // this.arrayItemList.splice(index, 1)
       item.jobTitle= '';
       item.editTitle= true;
       item.monOpen=null;
      item.monClose=null;
        item.tuesOpen=null;
        item.tuesClose=null;
        item.wedOpen=null;
        item.wedClose=null;
        item.thursOpen=null;
        item.thursClose=null;
        item.friOpen=null;
        item.friClose=null;
        item.satOpen=null;
        item.satClose=null;
        item.sunOpen=null;
        item.sunClose=null;
       item.showStep= '';
       item.showEditBtn= false;
       item.employeeType= '';
       item.permissions= [{ perKey: '' }];
       item.serviceList= [
            {
              category: '',
              serList: [
                {
                  service: '',
                  time: null,
                  price: ''
                }
              ]
            }
          ];

      } else {
        this.toastr.error('Please fill all the values', 'Error', {
          timeOut: 3000,
        });
      }
    }
  }
  addPermissionValue(item: any, index: any) {
    item.permissions.push({
      perKey: ''
    })
  }
  addCategoryValue(item: any, index: any, addValue: any) {
    if (addValue == 'Category') {
      item.serviceList.push(
        {
          category: '',
          serList: [
            {
              service: '',
              time: null,
              price: ''
            }
          ]
        }
      )
    }
    else if (addValue == 'Service') {
      let addTo = item.serviceList.length
      item.serviceList[addTo - 1].serList.push({
        service: '',
        time: null,
        price: ''
      })

    }
  }
  cancelStep(item: any, index: any, goTO: any) {
    if (goTO == 'schedule') {
      item.monOpen=null;
      item.monClose=null;
        item.tuesOpen=null;
        item.tuesClose=null;
        item.wedOpen=null;
        item.wedClose=null;
        item.thursOpen=null;
        item.thursClose=null;
        item.friOpen=null;
        item.friClose=null;
        item.satOpen=null;
        item.satClose=null;
        item.sunOpen=null;
        item.sunClose=null;
    }
    else if (goTO == 'permission') {
      item.permissions = [{ perKey: '' }]
    }
    else if (goTO == 'employeeType') {
      item.employeeType = ''
    }
    else {
      item.serviceList = [{
        category: '',
        serList: [
          {
            service: '',
            time: null,
            price: ''
          }
        ]
      }]
    }
  }
}
