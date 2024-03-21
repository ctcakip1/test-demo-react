import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FcPlus } from "react-icons/fc";
import { upDateProfile } from "../../services/apiService";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { FormGroup } from "react-bootstrap";
import _ from "lodash";
import { useSelector } from "react-redux";

const UserInfor = (props) => {
    const account = useSelector((state) => state.user.account);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [username, setUserName] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (e) => {
        if (e.target.value && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            setPreviewImage("");
        }
    };
    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            // update state
            setEmail(account.email);
            setUserName(account.username);
            setRole(account.role);
            setImage("");
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, [account]);
    const handleSubmitUpdateProfile = async () => {
        let res = await upDateProfile(username, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
        console.log("res", res);
    };
    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                    </Form.Group>
                    <FormGroup as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            disabled={true}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </FormGroup>
                    <FormGroup as={Col}>
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            value={role}
                            disabled={true}
                            onChange={(e) => {
                                setRole(e.target.value);
                            }}
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </Form.Select>
                    </FormGroup>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label
                            className="lable-upload"
                            htmlFor="lableUpload"
                        >
                            <FcPlus />
                            Upload Image
                        </Form.Label>
                        <input
                            type="file"
                            id="lableUpload"
                            hidden
                            onChange={(e) => {
                                handleUploadImage(e);
                            }}
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className="img-preview">
                        {previewImage ? (
                            <img src={previewImage} />
                        ) : (
                            <span>Preview Image</span>
                        )}
                    </Form.Group>
                </Row>
            </Form>

            <button
                className="btn btn-primary"
                onClick={() => {
                    handleSubmitUpdateProfile();
                }}
            >
                Save Information
            </button>
        </>
    );
};
export default UserInfor;
