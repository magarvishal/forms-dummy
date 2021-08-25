import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getForms } from "../redux/forms/formActions";
import { useHistory, Link } from "react-router-dom";
import { Table, Button } from "reactstrap";

const Home = ({ forms, loading, getForms }) => {
  useEffect(() => {
    getForms();
  }, []);
  console.log(getForms);
  const history = useHistory();
  return (
    <>
      <div>
        <Button
          color="primary"
          onClick={() => {
            history.push("/newForm");
          }}
        >
          Add new Form
        </Button>
      </div>
      {loading ? (
        "Loading forms"
      ) : (
        <div>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>From Title</th>
                <th>Created By</th>
                <th>Date</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => {
                // return <li key={form._id}>{form.title}</li>;
                return (
                  <tr key={form._id}>
                    <th scope="row">{}</th>
                    <td>
                      <Link to={`/forms/${form._id}`}>{form.title}</Link>
                    </td>
                    <td>{form.createdBy}</td>
                    <td>{form.title}</td>
                    <td>{form.title}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    forms: state.forms,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getForms: () => dispatch(getForms()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
