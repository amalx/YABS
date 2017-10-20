export class Order {
    idOrder : number ;
    userName : string ;
    country :string ;
    firstName : string ;
    lastName : string ;
    address : string ;
    city : string ;
    state : string ;
    postalCode :string ;
    phoneNumber : string ;
    email : string ;
    cardType : string ;
    creditCardNumber : string ;

   constructor(country: string, firstName : string, lastName: string,
              address : string,city : string,state : string,postalCode : string,phoneNumber : string,email : string,
              cardType : string,creditCardNumber: string)

{ this.country = country; this.firstName = firstName ; this.lastName = lastName; this.address=address; this.city=city;
 this.state=state; this.phoneNumber = phoneNumber ; this.email = email ; this.cardType = cardType; this.creditCardNumber = creditCardNumber ;
this.userName = localStorage.getItem('userName');

}

}