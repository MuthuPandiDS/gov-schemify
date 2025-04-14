"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormHelperText, InputLabel } from "@mui/material"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import mongoose from "mongoose"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { useCurrentUser } from "@/hooks/use-current-user"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { trpc } from "@/app/_trpc/client"

export default function FormDialog() {
  const userEmail = useCurrentUser()?.email
  const userIdUsingEmail = trpc.user.getUserId.useQuery(userEmail!)
  const objId = new mongoose.Types.ObjectId(userIdUsingEmail.data?.id!)
  // console.log(userIdUsingEmail.data?.id!)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const userDetails = trpc.useDetails.getUserDetails.useQuery(
    userIdUsingEmail.data?.id!
  )
  console.log()
  const utils = trpc.useUtils()
  const createdUserDetails = trpc.useDetails.createUserDetails.useMutation({
    onSuccess: () => {
      utils.useDetails.getAll.invalidate()
    },
  })
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleChange = (e: SelectChangeEvent) => {
    form.setValue("domain", e.target.value)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (
      mounted &&
      (userDetails.data?.phoneNo === undefined ||
        userDetails.data?.phoneNo === null) &&
      !userDetails.isLoading
    ) {
      // console.log(userDetails.data?.phoneNo)
      setOpen(true)
    }
  }, [mounted, userDetails.data?.phoneNo, userDetails.isLoading])
  const userDetailsSchema = z.object({
    phoneNo: z.string().length(10, "Invalid phone number"),
    domain: z.string(),
  })
  const form = useForm<z.infer<typeof userDetailsSchema>>({
    resolver: zodResolver(userDetailsSchema),
  })
  const onSubmit = (values: z.infer<typeof userDetailsSchema>) => {
    try {
      const createUserDetails = createdUserDetails.mutateAsync({
        domain: values.domain,
        phoneNo: values.phoneNo,
        userId: userIdUsingEmail.data?.id!,
      })
      toast.success("Successfully profile completed !")
      setOpen(false)
    } catch (err) {
      toast.error("error in submission!")
    }
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   component: "form",
        //   onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault()
        //     const formData = new FormData(event.currentTarget)
        //     const formJson = Object.fromEntries((formData as any).entries())
        //   },
        // }}
        className="p-5"
      >
        <DialogTitle className="text-muted-foreground text-sm">
          Complete the profile
        </DialogTitle>
        <DialogContent>
          <DialogContentText minWidth={400}></DialogContentText>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="m-0 text-xs">Domain</FormLabel>
                      <FormControl autoFocus={true} className="w-full">
                        <div className="w-[70%]">
                          <Select
                            id="domain-name"
                            fullWidth
                            onChange={handleChange}
                            className="h-11"
                          >
                            <MenuItem value={"Agriculture"}>
                              Agriculture
                            </MenuItem>
                            <MenuItem value={"Tourism"}>Tourism</MenuItem>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl autoFocus={true} className="w-full">
                        <div className="w-full">
                          <TextField
                            className="m-3"
                            id="outlined-basic"
                            variant="standard"
                            label="phone number"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="absolute bottom-2 right-20" type="submit">
                  Subscribe
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
