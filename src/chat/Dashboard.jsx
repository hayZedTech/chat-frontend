import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [app, setApp] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [msg, setMsg] = useState("");
  const [editInfo, setEditInfo] = useState(null);
  const [editMsg, setEditMsg] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [activeReplyBox, setActiveReplyBox] = useState(null);
  const URL = "http://localhost:4000/app";
  const navigate = useNavigate();
  const bottom = useRef();
  const lastRef = useRef(null);


    useEffect(() => {
   if(lastRef.current == "load"){
     bottom.current?.scrollIntoView();
   }
   lastRef.current = null;
  }, [app]);

  useEffect(()=>{
    lastRef.current = "load";
  }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      setApp(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const insertData = async () => {
    if (!msg) {
      alert("Field cannot be empty!");
      return;
    }
    try {
      await axios.post(URL, { user: user.username, msg, replyTo });
      setMsg("");
      setReplyTo(null);
      setActiveReplyBox(null);
      lastRef.current = "load";
     await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const editData = (id, msg) => {
    setEditInfo(id);
    setEditMsg(msg);
  };

  const updateData = async (id) => {
    if (!editMsg) {
      alert("Field cannot be empty!");
      return;
    }
    try {
      await axios.put(`${URL}/${id}`, { msg: editMsg });
      setEditInfo(null);
      setEditMsg("");
  
     await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column v-100">
      <div
        className="border w-100 shadow p-4 rounded d-flex flex-column"
        style={{ maxWidth: "600px", height: "90vh" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Welcome {user.username}</h4>
          <button className="btn btn-sm btn-danger" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Messages */}
        <div className="d-flex flex-column overflow-auto mb-3" style={{ flex: 1 }}>
          {app.map((e) => {
            const isUser = e.name === user.username;
            return (
              <div
                key={e.id}
                className={`rounded m-2 p-3 ${
                  isUser
                    ? "align-self-end bg-info"
                    : "align-self-start text-white bg-secondary"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {/* Reply preview */}
                {e.replyTo && (
                  <div className="bg-light text-dark p-2 mb-2 rounded small">
                    <b>{e.replyUser}:</b> <em>{e.replyMessage}</em>
                  </div>
                )}

                {/* Edit mode */}
                {editInfo === e.id ? (
                  <form
                    onSubmit={(j) => {
                      j.preventDefault();
                      updateData(e.id);
                    }}
                  >
                    <input
                      type="text"
                      className="form-control form-control-sm mb-2"
                      value={editMsg}
                      onChange={(x) => setEditMsg(x.target.value)}
                    />
                    <button className="btn btn-sm btn-primary me-2">Save</button>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning"
                      onClick={() => setEditInfo(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <b>{isUser ? "You" : e.name}:</b> <span>{e.message}</span>
                    <div className="mt-2 d-flex gap-2">
                      {isUser && (
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => editData(e.id, e.message)}
                        >
                          Edit
                        </button>
                      )}
                      {!isUser && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => {
                            setReplyTo(e.id);
                            setActiveReplyBox(e.id);
                          }}
                        >
                          Reply
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteData(e.id)}
                      >
                        Delete
                      </button>
                    </div>

                    {/* Inline reply box */}
                    {activeReplyBox === e.id && (
                      <form
                        className="d-flex mt-2"
                        onSubmit={(i) => {
                          i.preventDefault();
                          insertData();
                        }}
                      >
                        <input
                          type="text"
                          className="form-control me-2"
                          placeholder={`Reply to ${e.name}...`}
                          value={msg}
                          onChange={(x) => setMsg(x.target.value)}
                        />
                        <button type="submit" className="btn btn-primary btn-sm">
                          Send
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm ms-1"
                          onClick={() => {
                            setActiveReplyBox(null);
                            setReplyTo(null);
                            setMsg("");
                          }}
                        >
                          Cancel
                        </button>
                      </form>
                    )}

                    {/* Timestamp */}
                    <div className="text-end small mt-1 opacity-75">
                      {e.created_at}
                    </div>
                  </>
                )}
              </div>
            );
          })}
          <div ref={bottom}></div>
        </div>

        {/* Main input for new message when NOT replying */}
        {activeReplyBox === null && (
          <form
            className="d-flex mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              insertData();
            }}
          >
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message..."
              value={msg}
              onChange={(x) => setMsg(x.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
