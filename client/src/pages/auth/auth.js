import React, { useState, useId } from "react";
import {
  Box,
  Center,
  Button,
  Card,
  Text,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Toaster, toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router";
import { CONSTS } from "../../constants/constants";

//import { useToast } from "@chakra-ui/react";
const baseUrl = CONSTS.BASE_URL;

function Auth() {
  const [isOtpSend, setOtpSend] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);
  const id = useId();
  let navigate = useNavigate();
  //const toast = useToast();

  const createFormSchema = () => {
    console.log("Form schema updated");
    return z.object({
      fullName: z.string({
        required_error: "Name is Required",
      }),
      number: z
        .string({
          required_error: "Number is Required",
        })
        .length(10, { message: "Mobile number must be 10 digits" }),
      otp: isOtpSend
        ? z.string({ message: "OTP is required" })
        : z.string().optional(),
    });
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    console.log(control);
    console.log(errors);
    if (data.mobileNumber && !isOtpSend) {
      sendOtp(data);
      setOtpSend(true);
    } else if (data.mobileNumber && isOtpSend) {
      //createFormSchema();
      if (data.otp) {
        /* setError("otp", {
          type: "string",
          message: "OTP is required",
        }); */
        onOTPverifyHandler(data);
        /* toaster.create({
          title: "OTP verified succesfully",
          type: "success",
          duration: "6000",
          placement: "top-center",
        }); */
        //showToaster();
      }
    }
  });

  const showToaster = () => {
    toaster.success({
      id,
      title: "OTP verified succesfully",
      duration: "4000",
      onStatusChange: (details) => {
        if (details.status === "visible") {
        } else if (details.status === "dismissing") {
          navigate("/my-chats");
        }
      },
    });
  };

  async function sendOtp(data) {
    //axios.post
    const url = baseUrl + "api/user/send-otp";
    const body = {
      name: data.fullName,
      mobileNumber: data.mobileNumber,
    };
    const res = await axios.post(url, body);
    console.log(res);
  }

  const onCancelOtpSendHandler = () => {
    setOtpSend(false);
    setOtpVerified(false);
    setValue("otp", "");
  };

  const onOTPverifyHandler = async (data) => {
    setOtpVerified(true);
    const url = baseUrl + "api/user/verify-otp";
    const body = {
      name: data.fullName,
      mobileNumber: data.mobileNumber,
      otp: data.otp,
    };
    let resp;
    try {
      resp = await axios.post(url, body);
      if (resp.data && resp.data.success) {
        console.log("OTP is verified");
        showToaster();
      }
    } catch (err) {
      console.log(err);
      if (err && err.response.data && err.response.data.success) {
        console.log("OTP is verified");
        showToaster();
      } else {
        console.log("Failed to verify OTP");
        setError("otp", {
          type: "string",
          message: "OTP is invalid",
        });
        //setOtpVerified(false);
      }
    } finally {
      setOtpVerified(false);
    }
  };

  return (
    <div className="auth-ct">
      <Center bg="bg.emphasized" h="100vh" maxW="100%">
        <Box>
          <Card.Root maxW="sm">
            <Card.Header>
              <Card.Title className="text-center">
                <Text textStyle="xl">Let me connect</Text>
              </Card.Title>
              <Card.Description>
                Please login or signup with your mobile number.
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <form onSubmit={onSubmit}>
                {!isOtpSend && (
                  <>
                    <Field
                      required
                      label="Full Name"
                      invalid={!!errors.fullName}
                      errorText={
                        errors.fullName?.type === "required" ? (
                          <p role="alert">Full name is required</p>
                        ) : (
                          <p role="alert">Full name required atleast 2 chars</p>
                        )
                      }
                    >
                      <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="text"
                            {...register("fullName", {
                              required: true,
                              minLength: 2,
                            })}
                          />
                        )}
                      />
                    </Field>
                    <Field
                      required
                      label="Mobile Number"
                      helperText="Please enter a 10 digit mobile number"
                      invalid={!!errors.mobileNumber}
                      errorText={
                        errors.mobileNumber?.type === "required" ? (
                          <p role="alert">Mobile number is required</p>
                        ) : (
                          <p role="alert">Mobile number required 10 digits</p>
                        )
                      }
                    >
                      <Controller
                        name="mobileNumber"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...register("mobileNumber", {
                              required: true,
                              minLength: 10,
                              maxLength: 10,
                            })}
                          />
                        )}
                      />
                    </Field>
                    <Button
                      size="sm"
                      type="submit"
                      mt="4"
                      loading={isOtpSend}
                      loadingText="Sending OTP..."
                      spinnerPlacement="end"
                    >
                      Send OTP
                    </Button>
                  </>
                )}
                {isOtpSend && (
                  <>
                    <Field
                      required
                      label="OTP"
                      helperText="Please enter a OTP you received"
                      invalid={!!errors.otp}
                      errorText={
                        errors.otp?.type === "required" ? (
                          <p role="alert">OTP is required</p>
                        ) : (
                          <p role="alert">OTP is invalid</p>
                        )
                      }
                    >
                      <Controller
                        name="otp"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="number"
                            {...register("otp", {
                              required: true,
                            })}
                          />
                        )}
                      />
                    </Field>
                    <ButtonGroup size="sm" mt="4">
                      <Button
                        variant="outline"
                        onClick={onCancelOtpSendHandler}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        type="submit"
                        loading={isOtpVerified}
                        loadingText="Verifying OTP..."
                      >
                        Verify OTP
                      </Button>
                    </ButtonGroup>
                  </>
                )}
              </form>
            </Card.Body>
          </Card.Root>
        </Box>
      </Center>
      <Toaster />
    </div>
  );
}

export default Auth;
