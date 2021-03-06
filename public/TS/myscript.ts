/// <reference path="jquery.d.ts"/>
/**
 * ClassifiedAd
 */
class ClassifiedAd{
    
    productParentCategory: string;
    productChildCategory: string;
    productCity: string;
    productTitle: string;
    productBrand: string;
    productPrice: string;

    constructor(ProductParentCategory: string,ProductChildCategory: string,ProductCity: string,ProductTitle: string,ProductBrand: string,ProductPrice: string) {
        this.productParentCategory = ProductParentCategory;
        this.productChildCategory = ProductChildCategory;
        this.productCity = ProductCity;
        this.productTitle = ProductTitle;
        this.productBrand = ProductBrand;
        this.productPrice = ProductPrice;    
    }
}

/**
 * Products
 */
  class Products extends ClassifiedAd {
    super(PPCategory: string,PCCategory: string,PCity: string,PTitle: string,PBrand: string,PPrice: string) {}
}

// FilterArray();
// CustomSort();
// CreateOutput();

function validate(e, val) {
    $(".ah-alert-success").hide();
    $(".ah-alert-success p").remove();
    $(".ah-alert-warning").hide();
    $(".ah-alert-warning p").remove();
    let x : Boolean;
    if (e.keyCode == 13) {
        let txtarr = new Array();
        if (val.indexOf(",") !== -1) {
            txtarr = val.split(",");
            if (txtarr.length == 6) {
                for (let i = 0; i < txtarr.length; i++) {
                    if (txtarr[i].trim().length > 0) {
                        // console.log(txtarr[i].trim().length);
                        x = true;
                    } else {
                        x = false;
                    }
                }
            } else {
                x = false;
            }
        } else {
            $(".ah-alert-warning").show();
            $(".ah-alert-warning span,p").remove();
            $(".ah-alert-warning strong").after(
                "<p style='text-align:left;margin: 0;'> No category shouldn't be null. Se   parate each category with comma(,) Like below:</p>" +
                "<p style='text-align:left;font-weight: 400;margin: 0;'>[Parent Category],[Child Category],[Product Name],[Product Model],[Product Price],[Product City]</p>"
            );

        }

        if (x == false) {
            $(".ah-alert-warning").show();
            $(".ah-alert-warning p").remove();
            $(".ah-alert-warning strong").after(
                "<p> Please follow below instructions to insert any product:</p>" +
                "<p style='text-align:left;font-weight: 400;margin: 0;'>1- Complete all four categories and separate each with comma(,) <br />2- Do not left any value empty after comma(,)</p>"
            );
        } else if (x == true) {
            AddProducts(txtarr);
            $(".ah-alert-success").show();
            $(".ah-alert-success p").remove();
            $(".ah-alert-success strong").after(
                "<p>Your entries have been successfully inserted.</p>"
            );
        }
    }
}

let products = new Array<Products>();
function createOutput(ObjArray: Products[]) {
    $(".ah-show-products").html(""); //For refresh data
    for(let i = 0; i < ObjArray.length; i++) {
            $(".ah-show-products").append(
            "<ul>" +
                        "<li>" +
                            "<div>" +
                                "<table cellspacing='0' cellpadding='0'>" +
                                    "<tbody>" +
                                        "<tr>" +
                                            "<td rowspan='2'>" +
                                                "<img src='Img/megaphone.png' width='100' height='90' >" +
                                            "</td>" +
                                            "<td style='vertical-align:top;padding:0px 14px;width:322px;'>" +
                                                "<h3 style='paddding:0;margin:0'>" + ObjArray[i].productTitle + "</h3>" +
                                                "<p style='font-size:12px;padding-left:1px;'>" +
                                                    ObjArray[i].productChildCategory +" » " + ObjArray[i].productBrand +
                                                "</p>" +
                                                "<p style='font-size:10px;padding-left:1px;'>" +
                                                    "<strong>" + ObjArray[i].productCity + "</strong>" +
                                                "</p>" +
                                            "</td>" +
                                            "<td style='vertical-align:top;width:120px'>" +
                                                "<p>Rs: " + ObjArray[i].productPrice + "</p>" +
                                            "</td>" +
                                        "</tr>" +
                                    "</tbody>" +
                                "</table>" +
                            "</div>" +
                        "</li>" +
                "</ul>"
            );
        }
}
function createDummyRecords() {
    products.push(new Products("Mobiles","Tablets","Lahore","Ipad Mini","Ipad","14000"));
    products.push(new Products("Mobiles","Tablets","Karachi","Ipad Mini","Ipad","14000"));
    products.push(new Products("Mobiles","Mobiles Phones","Karachi","Galaxy Note 5","Samsung","65340"));
    products.push(new Products("Mobiles","Mobiles Phones","Islamabad","Galaxy S6 Edge","Samsung","58379"));
    products.push(new Products("Mobiles","Mobiles Phones","Hyderabad","Galaxy J2","Samsung","14699"));
    products.push(new Products("Mobiles","Mobiles Phones","Lahore","Microsoft Lumia 640 XL","Microsoft","14000"));
    
    createOutput(products);
}

function AddProducts(productDetails: string[]):boolean {
    products.push(new Products(productDetails[0],productDetails[1],productDetails[2],productDetails[3],productDetails[4],productDetails[5]));
    if(products.length > 0) {
        createOutput(products);
    }
    return true;
}



function SetCityName(e) {
    let txtCity: string = e.text;
    $("#city").val(txtCity);
    FilterArray();
}

function SetChildCategory(e) {
    let txtChildCategory: string = e.text;
    $("#childCategory").val(txtChildCategory);
    FilterArray();
}

let randomProducts = products;
function FilterArray() {
        randomProducts = products;
        let txtcity = $("#city").val().trim();
        let txtccategory = $("#childCategory").val().trim();
        let txtproduct = $("#product").val().trim();
        
        // if(txtcity != "All Cities"){
        //     alert(txtcity);
        //     randomProducts = $.grep(randomProducts, function(e){
        //         return e.productCity === "Karachi"
        //     });
        // }
        if(txtproduct.length > 0) {
            switch (txtproduct) {
                case txtproduct: 
                // alert("case1"); break;
                //Jab title null na ho
                //Jab city aur category All select hon
                if(txtccategory === "All Categories") {
                    if (txtcity != "All Cities" && txtcity.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productCity === txtcity && e.productTitle === txtproduct;
                        });
                    }
                    if (txtcity != "All Cities" && txtcity.length == 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productTitle === txtproduct;
                        });
                    }
                    if (txtcity === "All Cities" && txtcity.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productTitle === txtproduct;
                        });
                    }
                    createOutput(randomProducts);break;
                }
                if(txtcity === "All Cities") {
                    if (txtccategory != "All Categories" && txtccategory.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e){
                            return e.productChildCategory === txtccategory && e.productTitle === txtproduct;
                        });
                    }
                    if (txtccategory != "All Categories" && txtccategory.length == 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productTitle === txtproduct;
                        });
                    }
                    createOutput(randomProducts);break;
                }
                //Jab title ho
                //Jab category All na ho
                if(txtccategory != "All Categories" && txtccategory.length > 0) {
                    if (txtcity === "All Cities" && txtcity.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productChildCategory === txtccategory && e.productTitle === txtproduct;
                        });
                    }
                    if (txtcity != "All Cities" && txtcity.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productChildCategory === txtccategory && e.productCity === txtcity && e.productTitle === txtproduct;
                        });
                    }
                    if (txtcity != "All Cities" && txtcity.length == 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productChildCategory === txtccategory && e.productTitle === txtproduct;
                        });
                    }
                    createOutput(randomProducts);break;
                }
                //Jab title ho
                //Jab city All na ho
                if(txtcity != "All Cities" && txtcity.length > 0) {
                    if (txtccategory === "All Categories" && txtccategory.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e){
                            return e.productCity === txtcity && e.productTitle === txtproduct;
                        });
                    }
                    if (txtccategory != "All Categories" && txtccategory.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productChildCategory === txtccategory && e.productCity === txtcity && e.productTitle === txtproduct;
                        });
                    }
                    if(txtccategory != "All Categories" && txtccategory.length == 0) {
                        randomProducts = $.grep(randomProducts, function(e) {
                            return e.productCity === txtcity && e.productTitle === txtproduct;
                        });
                    }
                    createOutput(randomProducts);break;
                }

                else {
                    randomProducts = $.grep(randomProducts, function(e) {
                        return e.productTitle === txtproduct;
                    });
                    createOutput(randomProducts);break;
                }
            }

            // switch (txtproduct) {
            //     case txtproduct === txtproduct:
            //     if(txtccategory === "All Categories") {
            //         if (txtcity != "All Cities" && txtcity.length > 0) {
            //             randomProducts = $.grep(randomProducts, function(e) {
            //                 return e.productCity === txtcity && e.productTitle === txtproduct;
            //             });
            //         }
            //         if (txtcity != "All Cities" && txtcity.length == 0) {
            //             randomProducts = $.grep(randomProducts, function(e) {
            //                 return e.productTitle === txtproduct;
            //             });
            //         }
            //     }
            //     if(txtcity === "All Cities") {
            //         if (txtccategory != "All Categories" && txtccategory.length > 0) {
            //             randomProducts = $.grep(randomProducts, function(e){
            //                 return e.productChildCategory === txtccategory && e.productTitle === txtproduct;
            //             });
            //         }
            //         if (txtccategory != "All Categories" && txtccategory.length == 0) {
            //             randomProducts = $.grep(randomProducts, function(e) {
            //                 return e.productTitle === txtproduct;
            //             });
            //         }
            //     }
            //     break;
            //     // case txtccategory === "All Categories" : if (txtcity != "All Cities" && txtcity.length > 0) {
            //     //         randomProducts = $.grep(randomProducts, function(e) {
            //     //         return e.productCity === txtcity && e.productTitle === txtproduct;
            //     //     });
            //     // }
            //     // else {
            //     //     randomProducts = $.grep(randomProducts, function(e) {
            //     //         return e.productTitle === txtproduct;
            //     //     });
            //     // }
            //     // createOutput(randomProducts);
            //     // break;
                
            //     // case txtcity === "All Cities" : if (txtccategory != "All Categories" && txtccategory.length > 0) {
            //     //         randomProducts = $.grep(randomProducts, function(e){
            //     //         return e.productChildCategory === txtccategory && e.productTitle === txtproduct;
            //     //     });
            //     // }
            //     // createOutput(randomProducts);
            //     // break;
                
            //     default :
                
            //     if(txtccategory.length ===  0 && txtcity.length === 0) {
            //         randomProducts = $.grep(randomProducts, function(e){
            //             return e.productTitle === txtproduct;
            //         });
            //     }
            //     else {
            //         if(txtccategory != "All Categories" || txtcity != "All Cities") {
            //             randomProducts = $.grep(randomProducts, function(e){
            //                 return e.productChildCategory === txtccategory && e.productCity === txtcity && e.productTitle === txtproduct;
            //             });
            //         }     
            //     }   
            //     createOutput(randomProducts);
            //     break;
            // }

            // return true;
        }

        else if(txtcity.length > 0) {
            switch (txtcity) {
                case "All Cities" : if (txtccategory != "All Categories" && txtccategory.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e){
                        return e.productChildCategory === txtccategory;
                    });
                }
                createOutput(randomProducts);
                break;
                default :
                if (txtccategory != "All Categories" && txtccategory.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e){
                        return e.productChildCategory === txtccategory && e.productCity === txtcity;
                    });
                }
                else {
                    if(txtproduct > 0) {
                        randomProducts = $.grep(randomProducts, function(e){
                            return e.productCity === txtcity && e.productTitle === txtproduct;
                        });
                    }
                    else {
                        randomProducts = $.grep(randomProducts, function(e){
                            return e.productCity === txtcity;
                        });
                    }
                }
                createOutput(randomProducts);
                break;
            }
        }
        else if(txtccategory.length > 0) {
            switch (txtccategory) {
                case "All Categories" : if (txtcity != "All Cities" && txtcity.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e){
                        return e.productCity === txtcity;
                    });
                }
                createOutput(randomProducts);
                break;
                default :
                if (txtcity != "All Cities" && txtcity.length > 0) {
                        randomProducts = $.grep(randomProducts, function(e){
                        return e.productChildCategory === txtccategory && e.productCity === txtcity;
                    });
                }
                else {
                    if(txtproduct > 0) {
                        randomProducts = $.grep(randomProducts, function(e){
                            return e.productChildCategory === txtccategory && e.productTitle === txtproduct;
                        });
                    }
                    else {
                        randomProducts = $.grep(randomProducts, function(e){
                            return e.productChildCategory === txtccategory;
                        });
                    }
                }
                createOutput(randomProducts);
                break;
            }
        }
}

function CustomSort(val) {
    if(val == 0) { //low to high sorting
        randomProducts.sort((leftSide, rightSide): number => {
            if(leftSide.productPrice < rightSide.productPrice) return -1;
            if(leftSide.productPrice > rightSide.productPrice) return 1;
            return 0;
        });
    }
    if(val == 1) { //high to low sorting
        randomProducts.sort((leftSide, rightSide): number => {
            if(leftSide.productPrice > rightSide.productPrice) return -1;
            if(leftSide.productPrice < rightSide.productPrice) return 1;
            return 0;
        });
    }
    
    createOutput(randomProducts);
}

function AutoComplete():string[]{
    let arr = Array<string>()
    for(let i = 0; i < products.length; i++){
        arr.push(products[i].productTitle);
    }
    return arr;
}
//Mobiles,Mobile Phones,Karachi,Note 2,Infinix,10000





