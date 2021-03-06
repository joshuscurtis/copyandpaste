import React from "react";
import ReactDOM from "react-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
 
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";

import "./styles.css";

function CardApp(props) {
  var cardTitle = "Order: " + props.orderid;
  if (props.tablenum != null) {
    cardTitle = props.tablenum + " (Order: " + props.orderid + ")";
  }
  var kitCol = "secondary";
  var barCol = "secondary";

  if (props.assignee == false) kitCol = "primary";
  if (props.assignee2 == false) barCol = "primary";

  return (
    <div style={{ margin: 5 }}>
      <Card
        style={{ backgroundColor: props.isprocessing ? "#f0ad4e" : "#5cb85c" }}
        variant="outlined"
      >
        <CardHeader title={cardTitle} subheader={props.time}></CardHeader>
        <CardContent>
          <OrderItems order={props.order} />
        </CardContent>
        <CardActions>
          <Button variant="contained" color={kitCol} size="large">
            Kitchen
          </Button>
          <Button variant="contained" color={barCol} size="large">
            Bar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

function ButtonAppBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography align="center" variant="h4" component="h1" gutterBottom>
            iOrders
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function TableStream(props) {
  var rows = [];
  var orders = props.orders;
  console.log(orders);
  for (var i = 0; i < orders.length; i++) {
    rows.push(
      <CardApp
        orderid={orders[i].order_id}
        order={orders[i]}
        time={orders[i].closetime}
        isprocessing={orders[i].isprocessing}
        istable={orders[i].istable}
        isnew={orders[i].isnew}
        isclosed={orders[i].isclosed}
        tablenum={orders[i].tablenum}
        assignee={orders[i].assignee}
        assignee2={orders[i].assignee2}
      />
    );
  }
  return <div>{rows}</div>;
}

function OrderItem(props) {
  var comment = "";
  if (props.comment != null) comment = "Comment: " + props.comment;
  return (
    <div>
      <Box m={1} borderBottom={1}>
        <Typography variant="h5" align="center">
          {props.itemName}
        </Typography>
        <Typography variant="subtitle2" align="center">
          {props.variantName}
        </Typography>
        <Typography variant="h6" color="textSecondary" align="center">
          Qty: {props.qty}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          {comment}
        </Typography>
      </Box>
    </div>
  );
}

function OrderItems(props) {
  var order = props.order;
  //console.log(order);
  var rows = [];
  for (var i = 0; i < order.products.length; i++) {
    if (order.products[i].name.substring(0, 5) != "Table") {
      rows.push(
        <OrderItem
          variantName={order.products[i].variantName}
          itemName={order.products[i].name}
          qty={order.products[i].quantity}
          comment={order.products[i].comment}
        />
      );
    }
  }
  return <div>{rows}</div>;
}

export default function App() {
  var mOrders = [
    {
      order_id: 6663,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "a97ad560-bc70-11ea-8e84-e8e9c3aef28a",
          variantUuid: "a97be6d0-bc70-11ea-850c-4b3145c016e7",
          vatPercentage: 0,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Table 9",
          description: "",
          barcode: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28c09844-36c1-11ea-8227-e32937f459dc",
          variantUuid: "b4ee6140-3936-11ea-a02a-fccf98b089d3",
          vatPercentage: 0,
          unitPrice: 260,
          costPrice: 168,
          rowTaxableAmount: 130,
          name: "Toastie/Sandwich",
          description: "",
          variantName: "Cheddar Cheese, Not toasted",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28c09844-36c1-11ea-8227-e32937f459dc",
          variantUuid: "b4ee6140-3936-11ea-8553-387666ef0e2d",
          vatPercentage: 0,
          unitPrice: 280,
          costPrice: 168,
          rowTaxableAmount: 140,
          name: "Toastie/Sandwich",
          description: "",
          variantName: "Tuna, Cucumber, Not toasted",
          autoGenerated: false,
          id: "2",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "43e9aea0-3c5b-11ea-83c5-12eaef15e4d4",
          variantUuid: "43eac010-3c5b-11ea-9b79-b367ad74cc1b",
          vatPercentage: 0,
          unitPrice: 130,
          rowTaxableAmount: 65,
          name: "Tea",
          description: "",
          barcode: "",
          autoGenerated: false,
          id: "3",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28bd63fa-36c1-11ea-8227-e32937f459dc",
          variantUuid: "85570fa0-39e9-11ea-9d6f-3c9ab26afc27",
          vatPercentage: 0,
          unitPrice: 160,
          costPrice: 96,
          rowTaxableAmount: 80,
          name: "J2O",
          description: "",
          variantName: "Orange & Passionfruit",
          barcode: "50412037",
          autoGenerated: false,
          id: "4",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: true,
      isprocessing: true,
      isclosed: true,
      assignee: "false",
      assignee2: "false",
      time: "1598440747969",
      closetime: "1598441721685",
      tablenum: null
    },
    {
      order_id: 6661,
      isnew: true,
      products: [
        {
          quantity: "2",
          productUuid: "725c2fca-bd29-11ea-87e2-951dee1275ad",
          variantUuid: "725c30ba-bd29-11ea-87e2-951dee1275ad",
          vatPercentage: 0,
          unitPrice: 160,
          rowTaxableAmount: 160,
          name: "Sausage Roll",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28bc2b7b-36c1-11ea-8227-e32937f459dc",
          variantUuid: "83092d40-3df5-11ea-9d7d-c270552b4ea0",
          vatPercentage: 0,
          unitPrice: 130,
          costPrice: 78,
          rowTaxableAmount: 65,
          name: "Crumpets with butter",
          description: "",
          variantName: "Two",
          comment: "With cheese And marmite",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "66503216-d193-11ea-8ab8-b7ce88bfe09b",
          variantUuid: "665032f2-d193-11ea-8ab8-b7ce88bfe09b",
          vatPercentage: 0,
          unitPrice: 160,
          rowTaxableAmount: 80,
          name: "Cheddar & Bacon Turnover",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "2",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "e2887288-d33e-11ea-8ab8-b7ce88bfe09b",
          variantUuid: "40e80adc-d33f-11ea-8ab8-b7ce88bfe09b",
          vatPercentage: 0,
          unitPrice: 380,
          costPrice: 120,
          rowTaxableAmount: 190,
          name: "Jacket Potato",
          description: "",
          variantName: "Cheesy beans",
          autoGenerated: false,
          id: "3",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "2",
          productUuid: "8a9a46a0-3c53-11ea-af63-a35e7b7f997a",
          variantUuid: "8a9b5810-3c53-11ea-8ecd-4580a25ffbac",
          vatPercentage: 0,
          unitPrice: 150,
          rowTaxableAmount: 150,
          name: "Americano ",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "4",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "b72e10f0-bc70-11ea-a335-f0c7289eea1f",
          variantUuid: "b72ead30-bc70-11ea-8c43-57da261984e4",
          vatPercentage: 0,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Table 11",
          description: "",
          barcode: "",
          comment: "4ppl",
          autoGenerated: false,
          id: "5",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: true,
      isprocessing: true,
      isclosed: true,
      assignee: "false",
      assignee2: "false",
      time: "1598440618726",
      closetime: "1598441235286",
      tablenum: null
    },
    {
      order_id: 1,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "28be2740-36c1-11ea-8227-e32937f459dc",
          variantUuid: "28be2741-36c1-11ea-8227-e32937f459dc",
          vatPercentage: 0,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Misc Drink",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: false,
      isprocessing: true,
      isclosed: true,
      assignee: "false",
      assignee2: "false",
      time: null,
      closetime: null,
      tablenum: null
    }
  ];

  var mOrders2 = [
    {
      order_id: 7070,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "863f5d00-bc70-11ea-a2fd-8820d74c0a61",
          variantUuid: "86404760-bc70-11ea-8c99-c4bc93384c94",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Table 3",
          description: "",
          barcode: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "b1202718-edc4-11ea-ad17-610459d606aa",
          variantUuid: "b12027cc-edc4-11ea-ad17-610459d606aa",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 200,
          rowTaxableAmount: 200,
          name: "Hannah’s Brownie",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "9d9e2280-3c53-11ea-92b0-36c9f69b5c55",
          variantUuid: "9d9ee5d0-3c53-11ea-9c5a-55e770000ad6",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 180,
          rowTaxableAmount: 180,
          name: "Cappuccino",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "2",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "43e9aea0-3c5b-11ea-83c5-12eaef15e4d4",
          variantUuid: "43eac010-3c5b-11ea-9b79-b367ad74cc1b",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 130,
          rowTaxableAmount: 130,
          name: "Tea",
          description: "",
          barcode: "",
          autoGenerated: false,
          id: "3",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: true,
      isprocessing: false,
      isclosed: false,
      assignee: null,
      assignee2: null,
      time: "1599300560735",
      closetime: null,
      tablenum: null
    },
    {
      order_id: 7075,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "f7e60750-3c4c-11ea-8904-8bc74c688db4",
          variantUuid: "f7e62e60-3c4c-11ea-8904-8bc74c688db4",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Take Away",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "e4fb4ef0-3f50-11ea-98d2-51be7ae620c7",
          variantUuid: "e4fd4ac0-3f50-11ea-895f-51d045b6cde3",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 220,
          rowTaxableAmount: 220,
          name: "Mocha",
          description: "",
          barcode: "",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "8a9a46a0-3c53-11ea-af63-a35e7b7f997a",
          variantUuid: "8a9b5810-3c53-11ea-8ecd-4580a25ffbac",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 150,
          rowTaxableAmount: 150,
          name: "Americano ",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "2",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: false,
      isprocessing: true,
      isclosed: true,
      assignee: null,
      assignee2: null,
      time: "1599303047226",
      closetime: "1599309695451",
      tablenum: null
    },
    {
      order_id: 7097,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "8a9a46a0-3c53-11ea-af63-a35e7b7f997a",
          variantUuid: "8a9b5810-3c53-11ea-8ecd-4580a25ffbac",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 150,
          rowTaxableAmount: 0,
          name: "Americano ",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "725c2fca-bd29-11ea-87e2-951dee1275ad",
          variantUuid: "725c30ba-bd29-11ea-87e2-951dee1275ad",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 160,
          rowTaxableAmount: 0,
          name: "Sausage Roll",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: false,
      isprocessing: true,
      isclosed: true,
      assignee: "false",
      assignee2: "false",
      time: "1599313541908",
      closetime: "1599328728108",
      tablenum: null
    },
    {
      order_id: 7098,
      isnew: true,
      products: [
        {
          quantity: "2",
          productUuid: "9d9e2280-3c53-11ea-92b0-36c9f69b5c55",
          variantUuid: "9d9ee5d0-3c53-11ea-9c5a-55e770000ad6",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 180,
          rowTaxableAmount: 360,
          name: "Cappuccino",
          variantName: "",
          fromLocationUuid: "d7d1c49a-36c0-11ea-ac06-dbc3974b77ca",
          toLocationUuid: "d7d1c4ae-36c0-11ea-b8ca-c41d80aae161",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          details: {},
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "d9498c60-3934-11ea-9fda-c52aaa9233a1",
          variantUuid: "d94a9dd0-3934-11ea-b5a5-a6039c054fd5",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 60,
          rowTaxableAmount: 60,
          name: "Sparkling Water ",
          variantName: "",
          barcode: "",
          fromLocationUuid: "d7d1c49a-36c0-11ea-ac06-dbc3974b77ca",
          toLocationUuid: "d7d1c4ae-36c0-11ea-b8ca-c41d80aae161",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          details: {},
          libraryProduct: true
        }
      ],
      istable: false,
      isprocessing: true,
      isclosed: true,
      assignee: null,
      assignee2: null,
      time: "1599313546914",
      closetime: "1599334764424",
      tablenum: null
    },
    {
      order_id: 7024,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "e16b66d0-ba25-11ea-bd58-e0928794ceb0",
          variantUuid: "e16c7840-ba25-11ea-b2bf-478540e0bb7a",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Table 2",
          description: "",
          barcode: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28c09844-36c1-11ea-8227-e32937f459dc",
          variantUuid: "b4ee6140-3936-11ea-b108-a43a087431a3",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 280,
          costPrice: 168,
          rowTaxableAmount: 280,
          name: "Toastie/Sandwich",
          description: "",
          variantName: "Cumberland Sausage, Toasted",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28bd63f2-36c1-11ea-8227-e32937f459dc",
          variantUuid: "28bd63f3-36c1-11ea-8227-e32937f459dc",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 260,
          costPrice: 156,
          rowTaxableAmount: 260,
          name: "Ham & Cheese Croissant",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "2",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "2",
          productUuid: "5b3518e0-3c53-11ea-aeb9-9304bbabbcff",
          variantUuid: "29559f40-3f67-11ea-b68e-d872fe59a498",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 180,
          rowTaxableAmount: 360,
          name: "Latte",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "3",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: true,
      isprocessing: true,
      isclosed: true,
      assignee: null,
      assignee2: "false",
      time: "1599218318662",
      closetime: "1599221078098",
      tablenum: null
    },
    {
      order_id: 7060,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "976c5600-bc70-11ea-b461-c4a8c6d925e3",
          variantUuid: "976cf240-bc70-11ea-b622-ad2437794b01",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Table 5",
          description: "",
          barcode: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28bd8b00-36c1-11ea-8227-e32937f459dc",
          variantUuid: "28bd8b01-36c1-11ea-8227-e32937f459dc",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 60,
          costPrice: 36,
          rowTaxableAmount: 60,
          name: "Kids Carton",
          description: "",
          variantName: "Apple",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "b1202718-edc4-11ea-ad17-610459d606aa",
          variantUuid: "b12027cc-edc4-11ea-ad17-610459d606aa",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 200,
          rowTaxableAmount: 200,
          name: "Hannah’s Brownie",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "2",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28beea90-36c1-11ea-8227-e32937f459dc",
          variantUuid: "28beea91-36c1-11ea-8227-e32937f459dc",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 130,
          costPrice: 90,
          rowTaxableAmount: 130,
          name: "Tea",
          description: "",
          variantName: "Breakfast, Standard",
          autoGenerated: false,
          id: "3",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: true,
      isprocessing: false,
      isclosed: false,
      assignee: null,
      assignee2: null,
      time: "1599296972124",
      closetime: null,
      tablenum: null
    },
    {
      order_id: 7084,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "28c09844-36c1-11ea-8227-e32937f459dc",
          variantUuid: "b4ee6140-3936-11ea-b4e3-27cd10a2b3a4",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 280,
          costPrice: 168,
          rowTaxableAmount: 280,
          name: "Toastie/Sandwich",
          description: "",
          variantName: "Bacon & Brie, Toasted",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "3",
          productUuid: "5b3518e0-3c53-11ea-aeb9-9304bbabbcff",
          variantUuid: "29559f40-3f67-11ea-b68e-d872fe59a498",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 180,
          rowTaxableAmount: 540,
          name: "Latte",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "1",
          productUuid: "28bd8b03-36c1-11ea-8227-e32937f459dc",
          variantUuid: "a49ceb70-3e29-11ea-be72-67a65bb34054",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 210,
          costPrice: 108,
          rowTaxableAmount: 210,
          name: "Latte",
          description: "",
          variantName: "None, Oat, 2 Shot",
          autoGenerated: false,
          id: "2",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: false,
      isprocessing: true,
      isclosed: true,
      assignee: null,
      assignee2: null,
      time: "1599306278921",
      closetime: "1599309776676",
      tablenum: null
    },
    {
      order_id: 7099,
      isnew: true,
      products: [
        {
          quantity: "1",
          productUuid: "b72e10f0-bc70-11ea-a335-f0c7289eea1f",
          variantUuid: "b72ead30-bc70-11ea-8c43-57da261984e4",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Table 11",
          description: "",
          barcode: "",
          autoGenerated: false,
          id: "0",
          type: "PRODUCT",
          libraryProduct: true
        },
        {
          quantity: "2",
          productUuid: "28be2740-36c1-11ea-8227-e32937f459dc",
          variantUuid: "28be2741-36c1-11ea-8227-e32937f459dc",
          vatPercentage: 0,
          taxRates: [{ percentage: 0 }],
          taxExempt: false,
          unitPrice: 0,
          rowTaxableAmount: 0,
          name: "Misc Drink",
          description: "",
          variantName: "",
          autoGenerated: false,
          id: "1",
          type: "PRODUCT",
          libraryProduct: true
        }
      ],
      istable: true,
      isprocessing: false,
      isclosed: false,
      assignee: null,
      assignee2: null,
      time: "1599345130176",
      closetime: null,
      tablenum: "Table 11"
    }
  ];

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <ButtonAppBar />
      </Grid>
      <Grid item xs={6} spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Left
        </Typography>
        <TableStream orders={mOrders} />
      </Grid>
      <Grid item xs={6} spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Right
        </Typography>
        <TableStream orders={mOrders2} />
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));


