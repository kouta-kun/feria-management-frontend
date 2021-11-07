import React from "react";

export class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'route': props.initialRoute || '/'};
    }


    setRoute(route) {
        this.setState({'route': route});
        window.history.pushState({'route': route}, "route", route);
    }

    render() {
        let reactChildren = React.Children.toArray(this.props.children);

        let children = [];


        reactChildren.forEach(p => {
            function routeMatches(template, route) {
                let matches;
                let argument;
                if (template === route) {
                    matches = true;
                    argument = null;
                } else {
                    let colonIndex = template.indexOf(":");
                    if (colonIndex >= 0) {
                        let argumentIndex = colonIndex;
                        let argumentName = template.slice(argumentIndex + 1);
                        template = template.slice(0,
                            argumentIndex);
                        if (route.startsWith(template)) {
                            matches = true;
                            argument = [argumentName, route.slice(argumentIndex)];
                        } else {
                            matches = false;
                            argument = null;
                        }
                    } else {
                        matches = false;
                        argument = null;
                    }
                }
                return [matches, argument];
            }

            let routeMatch = routeMatches(p.props.route, this.state.route);
            let matches = routeMatch[0];
            let argument = routeMatch[1]
            if (matches) {
                if (argument !== null) {
                    const newProp = {};
                    newProp[argument[0]] = argument[1];
                    children.push(React.cloneElement(p, newProp))
                } else
                    children.push(p);
            }
        });

        return <div style={{"padding-top": "75px"}}>{children}</div>;
    }
}