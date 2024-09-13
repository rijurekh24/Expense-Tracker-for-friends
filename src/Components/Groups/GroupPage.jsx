import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Utils/api";
import {
  Container,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import { authContext } from "../../Context/AuthContext";

const GroupPage = () => {
  const { _id } = useParams();
  const [groupData, setGroupData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [customShares, setCustomShares] = useState({});
  const ctx = useContext(authContext);

  const fetchGroupData = () => {
    Api.get(`/groups/group/${_id}`)
      .then((res) => {
        const group = res.data.group;
        console.log(group);
        setGroupData(group);
        setExpenses(group.expenses || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchGroupData();
  }, [_id]);

  const handleAddExpense = () => {
    if (!expenseDescription || !expenseAmount) return;

    const totalAmount = parseFloat(expenseAmount);
    let expenseDetail;

    if (splitType === "equal") {
      const numMembers = groupData.members.length;
      const share = (totalAmount / numMembers).toFixed(2);
      expenseDetail = {
        description: expenseDescription,
        amount: totalAmount,
        shares: {},
      };

      groupData.members.forEach((member) => {
        expenseDetail.shares[member.user_id._id] = parseFloat(share);
      });
    } else {
      const totalShares = Object.values(customShares).reduce(
        (sum, share) => sum + parseFloat(share) || 0,
        0
      );

      if (Math.abs(totalShares - totalAmount) > Number.EPSILON) {
        alert("Total shares must equal the total amount.");
        return;
      }

      expenseDetail = {
        description: expenseDescription,
        amount: totalAmount,
        shares: { ...customShares },
      };
    }

    Api.post("/groups/create-transaction", {
      _id: ctx?.user?._id,
      group_id: groupData?._id,
      description: expenseDescription,
      amount: totalAmount,
      shares: expenseDetail.shares,
    })
      .then((res) => {
        fetchGroupData();
      })
      .catch((err) => {
        // console.log(err);
      });

    setExpenses([...expenses, expenseDetail]);
    setExpenseDescription("");
    setExpenseAmount("");
    setCustomShares({});
  };

  const handleShareChange = (id, value) => {
    const parsedValue = parseFloat(value) || 0;
    setCustomShares((prev) => ({
      ...prev,
      [id]: parsedValue,
    }));
  };

  const renderExpenseShares = (shares) => {
    return Object.entries(shares).map(([name, share]) => {
      const shareAmount = parseFloat(share) || 0;
      return (
        <ListItem key={name}>
          <ListItemText
            primary={`${name}`}
            secondary={` ₹${shareAmount.toFixed(2)}`}
          />
        </ListItem>
      );
    });
  };

  const sortedTransactions =
    groupData?.transactions
      ?.slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Group : {groupData?.name}
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Expense
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <TextField
            fullWidth
            label="Expense Description"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Total Amount"
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            margin="normal"
            InputProps={{ step: "0.01" }}
          />
        </Box>

        <FormControl
          component="fieldset"
          margin="normal"
          sx={{ display: "block" }}
        >
          <RadioGroup
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
            row
          >
            <FormControlLabel
              value="equal"
              control={<Radio />}
              label="Split Equally"
            />
            <FormControlLabel
              value="custom"
              control={<Radio />}
              label="Custom Split"
            />
          </RadioGroup>
        </FormControl>

        {splitType === "custom" && groupData?.members && (
          <Box>
            {groupData.members.map((member) => (
              <TextField
                key={member.user_id._id}
                fullWidth
                label={`${member.user_id.name}`}
                type="number"
                value={customShares[member.user_id._id] || ""}
                onChange={(e) =>
                  handleShareChange(member.user_id._id, e.target.value)
                }
                margin="normal"
                InputProps={{ step: "0.01" }}
              />
            ))}
          </Box>
        )}

        <Button
          variant="contained"
          sx={{
            bgcolor: "#7F00FF",
            "&:hover": {
              bgcolor: "#7F00FF",
            },
          }}
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
      </Paper>

      <Typography variant="h6">Expenses</Typography>
      <List>
        {sortedTransactions.map((exp, index) => (
          <Paper elevation={2} key={index} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">{exp.description}</Typography>
            <Typography variant="h6">
              Total Bill: ₹{exp.amount.toFixed(2)}
            </Typography>
            <List>{renderExpenseShares(exp.share)}</List>
          </Paper>
        ))}
      </List>
    </Box>
  );
};

export default GroupPage;
