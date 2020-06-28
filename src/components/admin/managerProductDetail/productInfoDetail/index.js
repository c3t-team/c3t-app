import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ProductItem from "./productItem";
import { connect } from "react-redux";
import { atcGetProductRequest } from "../../../../actions";
import axios from "axios";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./style.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import callApi from "../../../../utils/apiCaller";
import { Redirect } from "react-router-dom";

function ProductInfoDetail(props) {
  const [data, setData] = useState(new FormData());
  const [url, setUrl] = useState([]);
  const [discription, setDiscription] = useState(EditorState.createEmpty());
  const [discHtml, setDiscHtml] = useState("");
  // const [vd, setVd] = useState(EditorState.createEmpty());

  // product detail info
  const [showName, setShowName] = useState("");
  const [price, setPrice] = useState(0);
  const [prices, setPrices] = useState([]);
  const [sale, setSale] = useState(0);
  const [imageName, setImageName] = useState([]);
  const [isSave, setIsSave] = useState(false);
  const [sumInventory, setSumInventory] = useState(0);
  const [imgNameOld, setImgNameOld] = useState(0);
  const [checkUpdatePrice, setCheckUpdatePrice] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isModifi, setIsModifi] = useState(false);


  let fileListAvata;
  const onChangeImage = e => {
    const files = Array.from(e.target.files);
    setUrl([]);
    files.forEach(file => {
      data.append("images", file, file.name);
      let reader = new FileReader();
      reader.onload = () => {
        const _url = {
          imagePreviewUrl: reader.result
        };
        let __url = url;
        if (__url.length + 1 < 11) {
          __url.push(_url);
          setUrl([...__url]);
        }
      };

      reader.readAsDataURL(file);
    });
    setData(data);
  };

  const receivePrice = data => {
    setPrices(data);
    console.log("w", prices);
    setCheckUpdatePrice(true);
  };
  const removeImage = index => {
    let arr = url;
    let arrImgName = imageName;
    arrImgName.splice(index, 1);
    console.log("truoc", url.length);
    arr.splice(index, 1);
    setUrl([...arr]);
    console.log("sau", ...url);
  };
  const onEditorStateChange = editorState => {
    setDiscription(editorState);
    let valueHTml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setDiscHtml(valueHTml);
    //chuyển
    // const blocksFromHtml = htmlToDraft(discHtml);
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(
    //   contentBlocks,
    //   entityMap
    // );
    // const editorState1 = EditorState.createWithContent(contentState);
    // setVd(editorState1);
  };

  const save = async () => {
    try {
      let imgs = [];
      if (url.length > 0) {
        const reponse = await axios.post(
          "http://localhost:1337/api/v1/uploads/images/multiple",
          data,
          {
            // receive two    parameter endpoint url ,form data
          }
        );
        if (reponse.data.payload && reponse.data.payload.length > 0) {
          imgs = reponse.data.payload;
        }
      }
      const product = {
        nameShow: showName,
        price: price,
        description: discHtml,
        sale: sale,
        images: imgs.concat(imgNameOld)
      };
      let reponse = await callApi(
        `products/${props.match.params.id}`,
        "PUT",
        product
      );

      if (checkUpdatePrice) {
        if (prices.length > 0) {
          prices.map(async (price, index) => {
            const res = await callApi(
              `products/update-price-detail/${props.match.params.id}`,
              "PUT",
              `{"id":"${props.product.detail[index]._id}", "price":"${price}"}`
            );
            console.log("respapa", res);
          });
        }
      }
      setIsSave(true);
    } catch (error) {}
  };

  useEffect(() => {
    console.log("id ne", props.match.params.id);
    props.getProduct(props.match.params.id);
  }, []);

  useEffect(() => {
    let product = props.product;
    console.log("product 1234", product);
    setShowName(product.nameShow);
    setPrice(product.price);
    setSale(product.sale);
    setImgNameOld(product.images);

    // html to editorState
    setDiscHtml(product.description);

    if (product.description && product.description.length > 0) {
      const blocksFromHtml = htmlToDraft("" + product.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setDiscription(editorState);
    }

    if (product.detail && product.detail.length > 0) {
      let sum = 0;
      let arrPrices = [];
      product.detail.map((detail, index) => {
        sum += parseInt(detail.inventory);
        // const item = {
        //   id: product._id,
        //   price: detail.price
        // };
        arrPrices.push(detail.price);
      });
      setSumInventory(sum);
      setPrices(arrPrices);
    }
   
  }, [props.product]);

  const renderProductItem = () => {
    return (
      <ProductItem
        product={props.product}
        recive={receivePrice}
        prices={prices}
        disable={disable}
      />
    );
  };

  const renderImage = () => {
    var result = [];
    console.log("123dfg");
    if (url.length > 0) {
      result = url.map((item, index) => {
        console.log("name", item);
        return (
          <div style={{ position: "relative" }} key={item + new Date()}>
            <img
              src={item.imagePreviewUrl}
              key={index}
              className="imgProduct"
            />
            <HighlightOffIcon
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => removeImage(index)}
            />
          </div>
        );
      });
    }
    return result;
  };
  const renderImageOld = () => {
    console.log("kkkk", props.product);
    var result = [];
    let tempUrl = "http://localhost:1337/images/temp/";
    if (imgNameOld.length > 0) {
      result = imgNameOld.map((item, index) => {
        console.log("name ne", item);
        return (
          <div key={new Date() + item} style={{ position: "relative" }}>
            <img src={tempUrl + item} className="imgProduct" />
            <HighlightOffIcon
              style={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => removeImageOld(item, index)}
            />
          </div>
        );
      });
    }
    return result;
  };

  const removeImageOld = async (name, index) => {
    let arr = imgNameOld;
    arr.splice(index, 1);
    setImgNameOld([...arr]);
    let reponse = await callApi(
      `products/image/${props.product._id}`,
      "DELETE",
      `{"name": "${name}"}`
    );
  };
  return (
    <div>
      <div>
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="outline-button"
              onClick={() => { setIsModifi(true);setDisable(false)}}
              disabled={isModifi}
            >
              Sửa
            </button>
            <button
              className="outline-button"
              onClick={save}
              disabled={!isModifi}
            >
              Lưu
            </button>
            {isSave && <Redirect to="/admin/products" />}
          </div>
          <h6>PHẦN MÔ TẢ</h6>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              marginTop: "20px"
            }}
          >
            <div style={{ width: "100px" }}>Loại: </div>
            <div>
              <input
                value={`${props.product.categories.parent.name}/ ${props.product.categories.name}`}
                disabled
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            <div style={{ width: "100px" }}>Tên sản phẩm : </div>
            <div>
              <input value={props.product.name} disabled />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "100px" }}>Tên Hiển thị : </div>

            <div>
              <input
                placeholder="Tên hiển thị"
                name="showName"
                value={showName}
                className="input-name-show"
                onChange={e => setShowName(e.target.value)}
                disabled={disable}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <div style={{ width: "100px" }}>Giá bán ra:</div>
            <input
              type="number"
              name="price"
              value={price}
              className="format-input"
              onChange={e => setPrice(e.target.value)}
              disabled={disable}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "100px" }}>Sale</div>
            <div>
              <input
                type="number"
                placeholder="sale.."
                className="format-input"
                name="sale"
                value={sale}
                onChange={e => setSale(e.target.value)}
                disabled={disable}
              />
            </div>
          </div>
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <label>Mô tả:</label>
            <Editor
              editorState={discription}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
              readOnly={disable}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>Hình ảnh hiển thị</div>

          <div style={{ display: "flex" }}>
            {renderImageOld()}
            {renderImage()}
          </div>
          <div
            style={{ marginBottom: "20px", marginTop: "20px" }}
            onClick={() => fileListAvata.click()}
          >
            <label>Chọn ảnh</label>
          </div>
          <input
            multiple
            ref={e => (fileListAvata = e)}
            type="file"
            className="d-none"
            onChange={onChangeImage}
            disabled={disable}
          />
          {/* <button
            className="outline-button"
            onClick={() => {
              axios
                .post(
                  "http://localhost:1337/api/v1/uploads/images/multiple",
                  data,
                  {
                    // receive two    parameter endpoint url ,form data
                  }
                )
                .then(res => {
                  console.log("imageL:", res);
                });
            }}
          >
            upload
          </button> */}
        </div>
        <h6>THÔNG TIN CHI TIẾT SẢN PHẨM</h6>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell align="center">Màu sắc</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Giá bán</TableCell>
              <TableCell align="center">Sl tồn kho</TableCell>
              <TableCell align="center">Sl bán ra</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderProductItem()}</TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "50px",
            marginTop: "20px",
            width: "100%"
          }}
        >
          <div>
            {" "}
            <h5>Tổng tồn kho: {sumInventory}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
const stateMapToProps = (state, props) => {
  return {
    product: state.product
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    getProduct: id => {
      dispatch(atcGetProductRequest(id));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(ProductInfoDetail);
