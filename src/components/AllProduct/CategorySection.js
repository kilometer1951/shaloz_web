import React, { useEffect, useState } from "react";
import Header from "components/Header";
import "styles/all_product.css";
import * as actions from "actions";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 10,
  },
});

const CategorySection = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    selected,
    main_cat,
    sub_cat_one,
    sub_cat_two,
    category_data,
    setMain_cat,
    setSub_cat_one,
    setSub_cat_two,onSaleSelected
  } = props;

  //fetch
  useEffect(() => {}, []);

  const truncateString = (str) => {
    if (str.length > 20) {
      return str.slice(0, 22) + ". . .";
    } else {
      return str;
    }
  };

  const displaySubCatTwo = (sub_cat_one_id) => {
    return category_data.subcat_two_data.map((result, index) => {
      if (result.subCategoryOne == sub_cat_one_id) {
        return (
          <div
            style={{ fontFamily: "poppins_regular" }}
            onMouseEnter={() => setSub_cat_two(result.name)}
            key={index}>
            <StyledTreeItem
              nodeId={result._id}
              label={result.name}
              onLabelClick={() => {
                window.location.href = `/all_product?selected=${
                  result.name
                }&&main_cat=${main_cat}&&sub_cat_one=${sub_cat_one}&&sub_cat_two=${sub_cat_two}&&on_sale=${onSaleSelected}`;
              }}
            />
          </div>
        );
      } else {
        return null;
      }
    });
  };

  const displaySubCatOne = () => {
    return category_data.subcat_one_data.map((result, index) => {
      const filter = category_data.subcat_two_data.filter(
        (value) => value.subCategoryOne == result._id
      );

      if (filter.length === 0) {
        return (
          <div
            style={{ fontFamily: "poppins_regular" }}
            onMouseEnter={() => setSub_cat_one(result.name)}
            key={index}>
            <StyledTreeItem
              nodeId={result._id}
              label={result.name}
              onLabelClick={() => {
                window.location.href = `/all_product?selected=${
                  result.name
                }&&main_cat=${main_cat}&&sub_cat_one=${sub_cat_one}&&sub_cat_two=${sub_cat_two}&&on_sale=${onSaleSelected}`;
              }}
            />
          </div>
        );
      } else {
        return (
          <div
            style={{ fontFamily: "poppins_regular" }}
            onMouseEnter={() => setSub_cat_one(result.name)}
            key={index}>
            <StyledTreeItem
              nodeId={result._id}
              label={result.name}
              onLabelClick={() => {
                window.location.href = `/all_product?selected=${
                  result.name
                }&&main_cat=${main_cat}&&sub_cat_one=${sub_cat_one}&&sub_cat_two=${sub_cat_two}&&on_sale=${onSaleSelected}`;
              }}>
              {displaySubCatTwo(result._id)}
            </StyledTreeItem>
          </div>
        );
      }
    });
  };

  const renderCategory =
    category_data.main_cat &&
    category_data.main_cat.map((result, index) => {
      const filter = category_data.subcat_one_data.filter(
        (value) => value.mainCategory == result._id
      );

      if (filter.length === 0) {
        return (
          <div
            style={{ fontFamily: "poppins_regular" }}
            onMouseEnter={() => setMain_cat(result.name)}
            key={index}>
            <StyledTreeItem
              nodeId={result._id}
              label={result.name}
              onLabelClick={() => {
                window.location.href = `/all_product?selected=${
                  result.name
                }&&main_cat=${main_cat}&&sub_cat_one=${""}&&sub_cat_two=${""}&&on_sale=${onSaleSelected}`;
              }}
            />
          </div>
        );
      } else {
        return (
          <div
            style={{ fontFamily: "poppins_regular" }}
            onMouseEnter={() => setMain_cat(result.name)}
            key={index}>
            <StyledTreeItem
              nodeId={result._id}
              label={result.name}
              onLabelClick={() => {
                window.location.href = `/all_product?selected=${
                  result.name
                }&&main_cat=${main_cat}&&sub_cat_one=${""}&&sub_cat_two=${""}&&on_sale=${onSaleSelected}`;
              }}>
              {displaySubCatOne()}
            </StyledTreeItem>
          </div>
        );
      }
    });

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["1"]}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}>
      <StyledTreeItem
        nodeId="1"
        label="All Categories" onLabelClick={() => {
          window.location.href = `/all_product?selected=${"all"}&&main_cat=${""}&&sub_cat_one=${""}&&sub_cat_two=${""}&&on_sale=${onSaleSelected}`;
        }}>
        {renderCategory}
        
      </StyledTreeItem>
    </TreeView>
  );
};

export default CategorySection;

// <StyledTreeItem nodeId="3" label="Subtree with children">
// <StyledTreeItem nodeId="6" label="Hello" />
// <StyledTreeItem nodeId="7" label="Sub-subtree with children">
//   <StyledTreeItem nodeId="9" label="Child 1" />
//   <StyledTreeItem nodeId="10" label="Child 2" />
//   <StyledTreeItem nodeId="11" label="Child 3" />
// </StyledTreeItem>
// <StyledTreeItem nodeId="8" label="Hello" />
// </StyledTreeItem>
// <StyledTreeItem nodeId="4" label="World" />
// <StyledTreeItem nodeId="5" label="Something something" />
