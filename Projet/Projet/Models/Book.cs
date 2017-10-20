using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Projet.Models
{
    public class Book
    {   [Key]
        public  int BookId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public string Photo { get; set; }
        public int Quantity { get; set; }
        public string Descrption { get; set; }

    }
}