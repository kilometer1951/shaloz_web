import React, { useState, useEffect } from "react";
import HomeProduct from "components/Home/HomeProduct";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "actions";
import HomeLoader from "Loader/HomeLoader";

const HomeSection = (props) => {
  const dispatch = useDispatch();
  const fetched_home_data = useSelector((state) => state.app.fetched_home_data);
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  //console.log(user);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setIsLoading(true);
        await dispatch(actions.fetchHomeProducts(user._id));
        await dispatch(actions.fetchCartData(user._id, 1));
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
       // dispatch(actions.handleNetworkerror(true))
      }
    };
    fetchHomeProducts();
  }, []);

  const handleSeeMore = (value) => {
    if (Object.entries(user).length === 0) {
      dispatch(actions.openAuthModal(true));
      return;
    }
    props.history.push("/product/" + value);
  };

  return (
    <div style={{ paddingLeft: "6%" }}>
      {isLoading ? (
        <HomeLoader />
      ) : (
        <div>
           <div style={{ marginBottom: 50, marginTop: 50 }}>
            <HomeProduct
              title="Every day deals"
              data={fetched_home_data.deals}
              history={props.history}
              handleSeeMore={() => alert("go to deals page")}
            />
          </div>
          <div style={{ marginBottom: 50, marginTop: 50 }}>
            <HomeProduct
              title="Health & Beauty"
              data={fetched_home_data.health_beauty}
              history={props.history}
              handleSeeMore={handleSeeMore.bind(this, "Health & Beauty")}
            />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HomeProduct
              title="Jewelry & Hand made items for you"
              data={fetched_home_data.jewelry}
              history={props.history}
              handleSeeMore={handleSeeMore.bind(this, "Jewelry")}

            />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HomeProduct
              title="Recommend for you"
              data={fetched_home_data.home_garden}
              history={props.history}
              handleSeeMore={handleSeeMore.bind(this, "Home & Garden")}

            />
          </div>
          <div style={{ marginBottom: 50 }}>
            <HomeProduct
              title="Shop from the best"
              data={fetched_home_data.wedding_party}
              history={props.history}
              handleSeeMore={handleSeeMore.bind(this, "Wedding, Party & Events")}

            />
          </div>
          <div>
            <HomeProduct
              title="Shop all categories"
              data={fetched_home_data.wedding_party}
              history={props.history}
              handleSeeMore={handleSeeMore.bind(this, "all")}

            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeSection;
