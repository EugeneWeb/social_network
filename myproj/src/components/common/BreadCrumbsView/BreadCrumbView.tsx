import { Breadcrumb, Typography } from "antd";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

export const BreadCrumbView: FC = () => {
    const { pathname } = useLocation();

    const pathnames = pathname.split("/").filter((i) => i);

    return (
        <Breadcrumb style={{ margin: "16px 0" }}>
            {pathnames.length > 0 ? (
                <Breadcrumb.Item key="Home">
                    <Link to={`/`}>Home</Link>
                </Breadcrumb.Item>
            ) : (
                <Breadcrumb.Item key="Home">
                    <Typography.Text type="secondary">Home</Typography.Text>
                </Breadcrumb.Item>
            )}

            {!!pathnames.length &&
                pathnames.map((name, index) => {
                    const routeTo = `/${pathnames
                        .slice(0, index + 1)
                        .join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    const withUpperCase = name[0].toUpperCase() + name.slice(1);

                    return isLast ? (
                        <Breadcrumb.Item key={withUpperCase}>
                            <Typography.Text type="secondary">
                                {withUpperCase}
                            </Typography.Text>
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item key={withUpperCase}>
                            <Link to={routeTo}>{withUpperCase}</Link>
                        </Breadcrumb.Item>
                    );
                })}
        </Breadcrumb>
    );
};
