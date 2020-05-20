import React from "react";
import "./style.css";
import Footer from "../Footer/index";
import Navbars from "../customer/navbars/index";
import h1 from "../../assets/image/hinh1.jpg";
import h2 from "../../assets/image/hinh2.jpg";
import h3 from "../../assets/image/hinh3.jpg";
import tinh from "../../assets/image/tinh.jpg";
import trang from "../../assets/image/trang.jpg";
function Introduce() {
  return (
    <div>
      <div className="container">
        <h3 style = {{textAlign:'center', marginBottom:'20px', color: "#9D0B0B"}}>CHÀO MỪNG BẠN ĐẾN VỚI SHOE SHOP</h3>
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4 col-sm-4 photos">
                {" "}
                <img className="img" src={h1} alt="#" />{" "}
              </div>
              <div className="col-md-4 col-sm-4 photos">
                {" "}
                <img className="img" src={h2} alt="#" />{" "}
              </div>
              <div className="col-md-4 col-sm-4 photos">
                {" "}
                <img className="img" src={h3} alt="#" />{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h2
              style={{
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "10px"
              }}
            >
              Chúng tôi đã tạo ra một WebSite bán giày độc đáo{" "}
            </h2>
          </div>
        </div>
        <div className="row" style={{ padding: "15px" }}>
          <div className="col-md-6">
            <h6 style={{ color: "#9D0B0B" }}>
              MUA SẮM ONLINE ĐƠN GIẢN, NHANH CHÓNG VÀ AN TOÀN
            </h6>
            <p className="format-p">
              Nếu bạn đang tìm kiếm một trang web để mua giày trực tuyến thì
              SHOE SHOP là một sự lựa chọn hiệu quả dành cho bạn. Bản chất của
              SHOE SHOP là một nền tảng trang web thương mại điện tử. Điều này
              cho phép người mua và người bán hàng dễ dàng tương tác, trao đổi
              thông tin về sản phẩm và chương trình khuyến mãi của shop. Nhờ nền
              tảng đó, việc mua bán trên SHOE SHOP trở nên nhanh chóng và đơn
              giản hơn.
            </p>
          </div>
          <div className="col-md-6">
            <h6 style={{ color: "#9D0B0B" }}>
              MUA HÀNG CHÍNH HÃNG TỪ CÁC THƯƠNG HIỆU LỚN VỚI SHOE SHOP{" "}
            </h6>

            <p className="format-p">
              Là một kênh bán hàng uy tín, SHOE SHOP luôn cam kết mang lại cho
              khách hàng những trải nghiệm mua sắm online giá rẻ, an toàn và tin
              cậy. Các hoạt động giao dịch thanh toán tại SHOE SHOP luôn được
              đảm bảo diễn ra nhanh chóng, an toàn. SHOE SHOP luôn cam kết mọi
              sản phẩm trên SHOE SHOP đều là sản phẩm chính hãng, đầy đủ tem
              nhãn, bảo hành từ nhà bán hàng. Hãy truy cập ngay SHOE SHOP ngay
              hôm nay!
            </p>
          </div>
        </div>
        <div className="row" style={{ padding: "15px" }}>
          <div className="col-md-6">
            <h6 style={{ color: "#9D0B0B" }}>VỊ TRÍ CỦA CHÚNG TÔI</h6>
            <div className="exp-detail">
              <p className="format-p">
                Đối với người dùng trong khu vực, SHOE SHOP mang đến trải nghiệm
                mua sắm tích hợp với vô số sản phẩm đa dạng, cộng đồng người
                dùng năng động và chuỗi dịch vụ liền mạch.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <h6 style={{ color: "#9D0B0B" }}>MỤC TIÊU CỦA CHÚNG TÔI</h6>
            <ul>
              <li>
                <h6>Bước nhảy vọt vào điện tử</h6>
                <p>
                  Chúng tôi thật sự tin tưởng vào sức mạnh khai triển của công
                  nghệ và mong muốn góp phần làm cho thế giới trở nên tốt đẹp
                  hơn bằng việc kết nối cộng đồng người mua và người bán thông
                  qua việc cung cấp một nền tảng thương mại điện tử.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 team">
            <h4 style={{ textAlign: "center" }}>
              Đội ngũ tài năng của chúng tôi{" "}
            </h4>
          </div>
        </div>
        <div className="row team">
          <div className="col-md-3 col-sm-3  "></div>
          <div className="col-md-3 col-sm-3 team1 ">
            <div className="photo">
              <div className="imageblock">
                <img className="img" src={tinh} alt="#" />
                <div className="name">
                  <a href="#">Trần Thị Thu Tình </a>
                </div>
              </div>
              <h5>Người sáng lập</h5>
            </div>
          </div>
          <div className="col-md-3 col-sm-3 team1 ">
            <div className="photo">
              <div className="imageblock">
                <img className="img" src={trang} alt="#" />
                <div className="name">
                  <a href="#">Hoàng Thuỳ Trang </a>
                </div>
              </div>
              <h5>Người sáng lập</h5>
            </div>
          </div>
          <div className="col-md-3 col-sm-3  "></div>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
