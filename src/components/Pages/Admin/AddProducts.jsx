
import Swal from "sweetalert2";


const AddProduct = () => {

    const handelSubmit=event=>{
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

        fetch('https://restaurent-server-three.vercel.app/foods', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(allFoods)
        })
        .then(res=> res.json())
        .then(data =>{
          console.log(data);
          if(data.insertedId){
            Swal.fire({
                title: 'success',
                text: 'users added successfully',
                icon: 'success',
                confirmButtonText: 'Add successfully'
              })
            }
        })
    }
    return (
        <div>
          <h2 className="text-xl md:text-3xl text-center text-bold mb-4 font-extrabold">Add Your Food Item</h2>
             <div className="bg-blue-200 px-12  md:p-24 flex justify-center">
            
            <form onSubmit={handelSubmit}>
                {/* Picture url and Brand Name */}
                <div className="md:flex gap-3 ">
                        <div>
                            <div className="form-control ">
                            <label className="label">
                                <span className="label-text font-bold">Picture url</span>
                            </label>
                            <label className="input-group">
                                {/* <span>Name</span> */}
                                <input type="text" name="Picture" placeholder="Picture url" className="input input-bordered" required />
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
                                <input type="text" name="name" placeholder="Food name" required className="input input-bordered" />
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
                                <input type="text" name="category" placeholder="Food Category" className="input input-bordered" required list="foods"/>
                                <datalist id="foods">
                                  <option>biriyani</option>
                                  <option>salad</option>
                                  <option>pizza</option>
                                  <option>pasta</option>
                                  <option>fish</option>
                                  <option>chicken_barbeque</option>
                                </datalist>
                                
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
                                <input type="text" name="price" placeholder="Price" required className="input input-bordered" />
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
                                <input type="text" name="made" placeholder="Made By" className="input input-bordered" />
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
                                <input type="text" name="Description" placeholder="Short description" required className="input input-bordered" />
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
                                <input type="text" name="Rating" placeholder=" What Rating" required className="input input-bordered" />
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
                                <input type="text" name="Origin" placeholder=" Food Origin" required className="input input-bordered" />
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
                                <input type="text" name="Type" placeholder="Type"  className="input input-bordered" />
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
                                <input type="text" name="Top" placeholder="Top"  className="input input-bordered" />
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
                                <input type="text" name="Pieces" placeholder="Pieces Quantity"  className="input input-bordered" />
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
                                <input type="text" name="Discount" placeholder="Up to Regular Discount"  className="input input-bordered" />
                        </label>
                        </div>
                    </div>
              </div>

               
                    <div>
                      <input type="submit" value="Add Food Item" className="btn btn-block mt-4"/>
                    </div>
            </form>
        </div>
        </div>
    );
};

export default AddProduct;