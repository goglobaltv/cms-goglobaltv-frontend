import * as React from "react";
import ListItems from "./ListItems"
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Button, Grid, Box, } from "@mui/material";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { styled } from '@mui/material/styles';
import ImageIcon from '@mui/icons-material/Image';
import TitleIcon from '@mui/icons-material/Title';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormatBoldIcon from '@mui/icons-material/FormatBold';

library.add(faTrash)

const BoxMain = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
    padding: theme.spacing(3),
    width: '80%',
    borderRadius: 10,
}))

const MiniBox = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "fff" : theme.palette.grey[100],
    ...theme.typography.body1,
    padding: theme.spacing(1),
    width: '100%',
    textAlign: 'center',
    flexDirection: 'column',
    color: theme.palette.grey[700],
}))

const sizeIcon = {
    fontSize: 40
}


export default function CreateTool({ setItemNews }) {

    const [currentItem, setCurrentItem] = React.useState({ text: '', check: '', key: '' , img:null })
    const [item, setItem] = React.useState([])

    const addItem = () => {
        const newItem = currentItem;
        if (newItem.text !== "") {
            const items = [
                ...item,
                newItem
            ];
            setItem([...items])
            setCurrentItem({
                text: '', check: '', key: '' , img:null
            })
            setItemNews([...items])
        }
    }

    const handleAddTitle = () => {
        setCurrentItem({ text: "SubTitle", check: "SubTitle", Fieldtype: "input", key: Date.now() });
    }
    const handleAddSubTitle = () => {
        setCurrentItem({ text: "Bold", check: "FontBold",Fieldtype: "input",  key: Date.now() });
    }
    const handleAddContent = () => {
        setCurrentItem({ text: "Description", check: "Description",Fieldtype: "input", key: Date.now() });
    }
    const handleAddList = () => {
        setCurrentItem({ text: "List", check: "List",Fieldtype: "input", key: Date.now() });
    }

    const handleAddImage = () => {
        setCurrentItem({ text: "file", check: "Image", img:null , key: Date.now() });
    }

    const handleAddImageOneLayout = () => {
        setCurrentItem({ text: "AddImage", check: "ImageOneLayout", Fieldtype: "inputImage", key: Date.now() });
    }

    const handleAddImageTwoLayout = () => {
        setCurrentItem({ text: "AddImage", check: "ImageTwoLayout", Fieldtype: "inputImage", key: Date.now() });
    }

    const deleteItem = (key) => {
        const filteredItems = item?.filter(t => t.key !== key);
        setItem(filteredItems)
        setItemNews([...item])
    }


    const setUpdate = (text, key) => {
        const items = item;
        items?.map(i => {
            if (i.key === key) {
                console.log(i.key + "    " + key)
                i.text = text;
            }
        })
        setItem([...items])
        setItemNews([...items])
    }

    const setUpdateImage = (imgs, key) => {
        const items = item;
        items?.map(i => {
            if (i.key === key) {
                console.log(i.key + "    " + key)
                i.img = imgs;
            }
        })
        setItem([...items])
        setItemNews([...items])
    }


    React.useEffect(() => {
        if (currentItem?.text !== "") {
            addItem();
        }
    }, [currentItem])


    // Menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>  
        <Grid container spacing={2}>
            <Grid item xs={12}>            
                <BoxMain>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <MiniBox onClick={handleAddTitle}>
                                <TitleIcon sx={sizeIcon} />
                            Subtitle
                            </MiniBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MiniBox onClick={handleAddSubTitle} >
                                <FormatBoldIcon sx={sizeIcon} />
                                Font Bold
                            </MiniBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MiniBox onClick={handleAddContent} >
                                <FormatAlignLeftIcon sx={sizeIcon} />
                                Description
                            </MiniBox>
                        </Grid>
                        <Grid item xs={6}>
                            <MiniBox onClick={handleAddList}  >
                                <FormatListNumberedIcon sx={sizeIcon} />
                                List
                            </MiniBox>
                        </Grid>

                        {/* <Grid item xs={6}>
                            <MiniBox onClick={handleAddImage} >
                                <ImageIcon sx={sizeIcon} />
                                Choose Image
                            </MiniBox>
                        </Grid> */}

                        <Grid item xs={6}>
                            <MiniBox onClick={handleAddImageOneLayout} >
                                <ImageIcon sx={sizeIcon} />
                                Choose Image
                            </MiniBox>
                        </Grid>

                        <Grid item xs={6}>
                            <MiniBox onClick={handleAddImageTwoLayout} >
                                <ImageIcon sx={sizeIcon} />
                                Choose Image Two
                            </MiniBox>
                        </Grid>
                    </Grid>
                </BoxMain>
            </Grid>
            {/* <Button variant="outlined" onClick={handleAddTitle}>Title</Button> */}
            {/* <Button variant="outlined" onClick={handleAddSubTitle}>SubTitle</Button> */}
            <Grid item xs={12}>
                <ListItems items={item}
                    deleteItem={deleteItem}
                    setUpdate={setUpdate}
                    setUpdateImage={setUpdateImage}
                />
            </Grid>

        </Grid>

        </>
    )
}
