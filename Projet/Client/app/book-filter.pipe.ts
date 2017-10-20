import {PipeTransform , Pipe}  from '@angular/core';
import {IBook} from './book';
import {BookService} from './book.service';

@Pipe({
    name: 'bookFilter'
})

export class BookFilterPipe implements PipeTransform {
    transform(value : IBook[] , filterBy : string ): IBook []{
           
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return (filterBy ? value.filter((book: IBook) =>
        book.name.toLocaleLowerCase().indexOf(filterBy) !== -1 
        || book.category.toLocaleLowerCase().indexOf(filterBy) !== -1
         || book.author.toLocaleLowerCase().indexOf(filterBy) !== -1 ) : value);
        


            
    }

}