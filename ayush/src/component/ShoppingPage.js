import React, {useState, useEffect} from "react";
import axios from "axios";
import {Modal, Button, Form} from "react-bootstrap";
// import PaymentButton from "./PaymentButton";

function ShoppingPage({onEdit, onDelete}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 70000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false); // New state for address modal
  const [address, setAddress] = useState({
    // New state for address details
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const pageSize = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getallproduct"
        );
        const totalProducts = response.data.length;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        setProducts(response.data);
        setFilteredProducts(response.data.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(totalProducts / pageSize));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleSort = (order) => {
    const sorted = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  };

  const handlePriceFilter = (range) => {
    setPriceRange(range);
    const filtered = products.filter(
      (product) => product.price >= range[0] && product.price <= range[1]
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.product_name?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item._id === product._id);
      if (productExists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      } else {
        return [...prevCart, {...product, quantity: 1}];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === productId);
      if (existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item._id === productId ? {...item, quantity: item.quantity - 1} : item
        );
      } else {
        return prevCart.filter((item) => item._id !== productId);
      }
    });
  };

  const handleAddToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const productExists = prevWishlist.find(
        (item) => item._id === product._id
      );
      if (!productExists) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== productId)
    );
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    setShowAddressModal(true); // Show address form modal
  };

  const handleAddressSubmit = () => {
    // Here you can handle the address submission, e.g., send it to the server
    console.log("Address submitted:", address);
    setShowAddressModal(false); // Close the address form modal
    // Proceed to payment
    alert("Proceeding to payment!");
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleWishlistModalClose = () => setShowWishlistModal(false);
  const handleWishlistModalShow = () => setShowWishlistModal(true);

  const handleAddressModalClose = () => setShowAddressModal(false);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{height: "100vh"}}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-md-3">
          <div className="card shadow p-3">
            <h4>Filters</h4>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => handlePriceFilter([0, Number(e.target.value)])}
            />
            <span>Price: ₹0 - ₹{priceRange[1]}</span>
            <div className="mt-3">
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => handleSort("asc")}
              >
                Sort Asc
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => handleSort("desc")}
              >
                Sort Desc
              </button>
            </div>
            <br></br>
            <p>Type below for Search</p>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-9">
          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-lg-4 col-md-6 mb-4" key={product._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.product_name}
                    style={{height: "200px", objectFit: "contain"}}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.product_name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Price: ₹{product.price}
                    </h6>
                    <button
                      className="btn btn-outline-success me-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={handleModalShow}
        >
          View Cart ({cart.length})
        </button>
        <button
          className="btn btn-outline-warning"
          onClick={handleWishlistModalShow}
        >
          View Wishlist ({wishlist.length})
        </button>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group">
              {cart.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{item.product_name}</h5>
                    <p>
                      Price: ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <div className="mt-3">
              <h5>Total: ₹{calculateTotalPrice()}</h5>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={handleProceedToCheckout}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWishlistModal} onHide={handleWishlistModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Wishlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <ul className="list-group">
              {wishlist.map((item) => (
                <li
                  key={item._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{item.product_name}</h5>
                    <p>Price: ₹{item.price}</p>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleRemoveFromWishlist(item._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleWishlistModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddressModal} onHide={handleAddressModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={address.name}
                onChange={(e) => setAddress({...address, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street address"
                value={address.street}
                onChange={(e) =>
                  setAddress({...address, street: e.target.value})
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                value={address.state}
                onChange={(e) =>
                  setAddress({...address, state: e.target.value})
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your zip code"
                value={address.zip}
                onChange={(e) => setAddress({...address, zip: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                value={address.country}
                onChange={(e) =>
                  setAddress({...address, country: e.target.value})
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddressModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddressSubmit}>
            Submit Address
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-sm btn-outline-primary mx-1"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="btn btn-sm btn-light mx-1">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-sm btn-outline-primary mx-1"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ShoppingPage;
