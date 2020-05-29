import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class ListDisplay extends Component {
    render() {
        const {
            obj,
            title,
            homerooms,
            teachers
        } = this.props;
        let contents;
        let ct = -1;
        let keys;
        if (obj !== undefined && obj !== null) {
            keys = Object.keys(obj);
            contents = Object.values(obj).length !== 0 && Object.values(obj).map(object => {
                ct++;
                const childrenValues = Object.values(object);
                const childrenKeys = Object.keys(object);
                let localCt = -1;
                return (
                    <Card key={keys[ct]}>
                        <Card.Header>
                            <Accordion.Toggle
                                as={Button}
                                variant="link" eventKey={ct + ""}>
                                {object.name}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={ct + ""}>
                            <Card.Body>
                                {childrenValues.map(property => {
                                    localCt++;
                                    let display = property;
                                    if (property === true || property === false) {
                                        display = property ? "yes" : "no";
                                    } else if (childrenKeys[localCt] === "homeroom" && homerooms !== null && homerooms !== undefined) {
                                        // console.log(homerooms);
                                        if (homerooms[property] !== null && homerooms[property] !== undefined)
                                            display = homerooms[property].name;
                                        else
                                            display = "deleted class";
                                    }
                                    else if (childrenKeys[localCt] === "teacher" && teachers !== null && teachers !== undefined) {
                                        if (teachers[property] !== null && teachers[property] !== undefined)
                                            display = teachers[property].name;
                                        else
                                            display = "deleted teacher";
                                    }
                                    return (
                                        <div style={{ textAlign: "left" }}><b>{childrenKeys[localCt].charAt(0).toUpperCase() + childrenKeys[localCt].slice(1)}</b>: {display}</div>
                                    )
                                })}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                );
            });
        } else {
            contents = "None yet!";
        }
        return (
            <div style={{ margin: "15px" }}>
                <h3>{title}</h3>
                <Accordion style={{ maxHeight: "500px", overflow: "scroll", width: "280px" }}>
                    {contents}
                </Accordion>
            </div>
        );
    }
}
export default ListDisplay;