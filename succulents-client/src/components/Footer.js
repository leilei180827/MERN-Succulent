import React from "react";
function Footer() {
  return (
    <React.Fragment>
      {/* <hr className="mt-5" /> */}
      {/* <div className="footer"></div> */}
      <footer
        id="sticky-footer"
        className="mt-4 pt-4 pb-2 bg-dark text-white-50"
      >
        <div className="row ml-4 mr-1">
          <div className="col-10 col-lg-3  ">
            <h5>Policy Pages</h5>
            <p>
              Privacy Policy
              <br />
              Refund Policy
              <br />
              Shipping Policy
              <br />
              Terms of Service
            </p>
          </div>
          <div className=" col-auto ">
            <h5>Iciness Succulents</h5>
            <p>
              Shipping rare, unique and common succulents to Australian plant
              lovers
            </p>
            <p>Copyright &copy; Iciness Succulents</p>
          </div>
          <div className="col-10 col-lg-2">
            <img
              className="img-fluid"
              src={process.env.PUBLIC_URL + "/images/logo-small1.png"}
              alt="React Bootstrap logo"
            />
          </div>
        </div>
        {/* <div class="container text-center">Copyright &copy; Your Website</div> */}
      </footer>
    </React.Fragment>
  );
}
export default Footer;
