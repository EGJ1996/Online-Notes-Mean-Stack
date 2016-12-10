import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name:'csFilter'})
export class CourseFilter implements PipeTransform{
    transform(arr:any,it:string){
        if(it=="All"){
            return arr;
        }
        else{
            return arr.filter((item)=>item.course==it);
        }
    }
}