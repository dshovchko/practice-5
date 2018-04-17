import React from "react";

export default class Tabs extends React.Component {

    render() {
        return (
            <div class="row">
                <ul class="col-3 list-group">
                    <li class="list-group-item active">Tab 1</li>
                    <li class="list-group-item">Tab 2</li>
                    <li class="list-group-item">Tab 3</li>
                </ul>
                <div class="col-9">
                    <div>Content 1</div>
                    <div class="d-none">Content 2</div>
                    <div class="d-none">Content 3</div>
                </div>
            </div>
        );
    }
}
