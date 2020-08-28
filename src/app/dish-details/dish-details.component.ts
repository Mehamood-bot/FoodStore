import { Component, OnInit, Input, ViewChild, Inject  } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Location } from '@angular/common'; // location tracking back 
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { visibility } from '../animations/app.animation';
import { expand } from '../animations/app.animation';


@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
    styleUrls: ['./dish-details.component.css'],
    animations: [
        visibility(),
        expand()
    ]
})
export class DishDetailsComponent implements OnInit {
    dish: Dish;
    dishcopy: Dish;//taking copy before push
    dishIds: string[];
    prev: string;
    next: string;
    errMess: string;
    visibility = 'shown'; // animate is show 
    /* Reactive Form*/
    commentForm: FormGroup;
    comments: Comment;
    @ViewChild('cform') commentFormDirective;
    formErrors = {
        'author': 'Author Name is required.',
        'comment': 'Comment is required.',
        
    };
    validationMessages = {
        'author': {    
            'required': 'Author Name is required.',
            'minlength': 'Author Name must be at least 2 characters long.',
            
        },
        'comment': {
            'required': 'Comment is required.',
          
        },
    };


    constructor(public dishservice: DishService, public location: Location, public route: ActivatedRoute, public fb: FormBuilder, @Inject('BaseURL') public BaseURL) {
        // route: ActivatedRoute to know activated value in routes
        //@Inject taking provided value so object created once, can also do creating as rest serivce , for security reasons  and we are using form image 
    }

    ngOnInit() {
        this.createForm();
        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
        //below rxjs pipe not angular, it does helps us combine more than operator , in this  switchmap, only use but as practice use even on sing;e
        // if we add filter after switch , gives results of filter after competion of switch map
        this.route.params.pipe(switchMap((params: Params) => {
            this.visibility = 'hidden'; // when switch happen animate to hide
            //passing the id of dish-details ang get dish value vfrom getdish by id 
            return this.dishservice.getDish(params['id'])
        })) //end of pipe method has dish of our id now subcribing that dish by 
         .subscribe(dish => {
            this.dish = dish; // giving dish obtain by paramas
            this.dishcopy = dish; //getting copy
            this.setPrevNext(dish.id); // call method and setting next dish based 
            this.visibility = 'show'  // after complete show
        },
        errmess => this.errMess = <any>errmess);
    }

    //for dish to go next
    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack(): void {
        this.location.back();
    }
    
    createForm() {
        this.commentForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2)]],
            comment: ['', [Validators.required]],
            rating: 5,
            
        });

        this.commentForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

    }

    onValueChanged(data?: any) {
        if (!this.commentForm) { return; }
        const form = this.commentForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    onSubmit() {
        this.comments = this.commentForm.value
        this.comments.date = new Date().toString();
        this.dishcopy.comments.push(this.comments);
        this.dishservice.putDish(this.dishcopy)
            .subscribe(dish => {
                this.dish = dish; this.dishcopy = dish;
            },
                errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
        console.log(this.comments);
        this.commentForm.reset({
            author: '',
            comment: '',
        })
        this.commentFormDirective.reset({ rating: 5});
    }
}
