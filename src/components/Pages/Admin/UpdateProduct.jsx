


import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateProduct = () => {
    const food = useLoaderData();
    const {_id,Picture,Name,Category,Made,Price,Origin, Description,Rating,Top,Type,Pieces,Discount}=food;
    console.log(food.Name);


    const handelUpdate=event=>{
        event.preventDefault();
        const form =event.target;
        
        const Picture =form.Picture.value;
        const Name =form.name.value;
        const Category =form.category.value;
        const Price =form.price.value;
        const Made=form.made.value;
        const Description =form. description .value;
        const Rating=form.Rating.value;
        const Origin=form.Origin.value;
        const Top=form.Top.value;
        const Type=form.Type.value;
        const Pieces=form.Pieces.value;
        const Discount=form.Discount.value;
        const allFoods ={Picture,Name,Category,Made,Price,Origin, Description,Rating,Top,Type,Pieces,Discount}
        console.log(allFoods);
        event.target.reset();

        fetch(`http://localhost:5000/AllProductAdd/${_id}`,{
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(allFoods)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: 'success',
                    text: 'food update successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })
        .catch(error => {
            console.error('Error updating food:', error);
        });
    }
    return (
        <div>
          <h2 className="text-xl md:text-3xl text-center text-bold mb-4 font-extrabold">Update Your Food Item</h2>
             <div className="bg-blue-200 px-12  md:p-24 flex justify-center">
            
            <form onSubmit={handelUpdate}>
                {/* Picture url and Brand Name */}
                <div className="md:flex gap-3 ">
                        <div>
                            <div className="form-control ">
                            <label className="label">
                                <span className="label-text font-bold">Picture url</span>
                            </label>
                            <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Picture" defaultValue={Picture} placeholder="Picture url" className="input input-bordered"  />
                            </label>
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Food Name</span>
                            </label>
                            <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="name"  defaultValue={Name} placeholder="Food name"  className="input input-bordered" />
                            </label>
                            </div>
                        </div>
                </div>
                {/* Type and Model */}
                <div className="md:flex gap-3 ">
                        <div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Food category</span>
                            </label>
                            <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="category" defaultValue={Category} placeholder="Food Category" className="input input-bordered"  list="foods"/>
                                
                                
                            </label>
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Price</span>
                            </label>
                            <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="price" defaultValue={Price} placeholder="Price"  className="input input-bordered" />
                            </label>
                            </div>
                        </div>
                </div>
                {/*Price and Short description */}
                <div className="md:flex gap-3 ">
                        <div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Made By</span>
                            </label>
                            <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="made" defaultValue={Made} placeholder="Made By" className="input input-bordered" />
                            </label>
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold ">Short description</span>
                            </label>
                            <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Description" defaultValue={Description} placeholder="Short description"  className="input input-bordered" />
                            </label>
                            </div>
                        </div>
                </div>
                {/* Rating */}
               <div className="md:flex gap-3">
               <div>
                     <div className="form-control">
                     <label className="label">
                        <span className="label-text font-bold"> Rating </span>
                        </label>
                        <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Rating" defaultValue={Rating} placeholder=" What Rating"  className="input input-bordered" />
                        </label>
                        </div>
                    </div>
                    {/* food Origin */}
                <div>
                     <div className="form-control">
                     <label className="label">
                        <span className="label-text font-bold">Food Origin</span>
                        </label>
                        <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Origin" defaultValue={Origin} placeholder=" Food Origin"  className="input input-bordered" />
                        </label>
                        </div>
                    </div>
               
               </div>
              <div>
                {/* Top and Type */}
                <div className="md:flex gap-3">
                <div>
                     <div className="form-control">
                     <label className="label">
                        <span className="label-text font-bold">Type</span>
                        </label>
                        <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Type" defaultValue={Type} placeholder="Type"  className="input input-bordered" />
                        </label>
                        </div>
                    </div>
                    <div>
                     <div className="form-control">
                     <label className="label">
                        <span className="label-text font-bold">Top</span>
                        </label>
                        <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Top" defaultValue={Top} placeholder="Top"  className="input input-bordered" />
                        </label>
                        </div>
                    </div>
                </div>
              </div>
               {/* pieces and regular price  */}
              <div className="md:flex gap-3"> 
                  <div>
                     <div className="form-control">
                     <label className="label">
                        <span className="label-text font-bold">Pieces</span>
                        </label>
                        <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Pieces" defaultValue={Pieces} placeholder="Pieces Quantity"  className="input input-bordered" />
                        </label>
                        </div>
                    </div>
                    <div>
                     <div className="form-control">
                     <label className="label">
                        <span className="label-text font-bold">Discount</span>
                        </label>
                        <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Discount" defaultValue={Discount} placeholder="Up to Regular Discount"  className="input input-bordered" />
                        </label>
                        </div>
                    </div>
              </div>

               
                    <div>
                      <input type="submit" value="Update Food Item" className="btn btn-block mt-4"/>
                    </div>
            </form>
        </div>
        </div>
    );
};

export default UpdateProduct;