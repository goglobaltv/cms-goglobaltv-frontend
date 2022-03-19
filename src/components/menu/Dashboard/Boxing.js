import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { GiChart } from "react-icons/gi";
import { BsFillBagFill } from "react-icons/bs"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const fTitle = { xs: '18px', sm: '18px', md: '12px', lg: '12px', xl: '18px' }
const fSubtitle = { xs: '12px', sm: '12px', md: '10px', lg: '8px', xl: '12px' }
const fText = { xs: '20px', sm: '25px', md: '20px', lg: '15px', xl: '25px' }
const f200 = { xs: '25px', sm: '30px', md: '20px', lg: '20px', xl: '30px' }
const barup = { xs: '95px', sm: '100px', md: '110px', lg: '90px', xl: '100px' }

const colors = '#472CC9'

const Item = styled(Box)(() => ({
    border: '1px solid #472CC9',
    borderRadius: 30,
    height: 200,
    padding: 25,
}))

const Title = styled(Typography)(() => ({
    color: '#797E7F',
    fontWeight: 'bold',
    marginTop: 1,
    fontSize: fTitle,
}))
const SubTitle = styled(Typography)(() => ({
    color: '#797E7F',
    marginTop: 1,
    fontSize: fSubtitle,
}))

const NextText = styled(Typography)(() => ({
    color: colors,
    fontWeight: 'bold',
    marginTop: 10,
}))


const TextPro = styled(Typography)(() => ({
    color: colors,
    fontWeight: 'bold',
    fontSize: fText,
    marginTop: 10,
}))
function Boxing() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <NextText sx={{ fontSize: f200 }}>
                    30 Days Performance
                </NextText>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item >
                    <TextPro sx={{ fontSize: fText }}>
                        102001
                    </TextPro>
                    <TextPro sx={{ fontSize: fText }}>
                        Views
                    </TextPro>
                </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item >
                    <TextPro sx={{ fontSize: fText }}>
                        102001
                    </TextPro>
                    <TextPro sx={{ fontSize: fText }}>
                        Views
                    </TextPro>
                </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item >
                    <TextPro sx={{ fontSize: fText }}>
                        Top Views
                    </TextPro>
                    <Title sx={{ fontSize: fTitle }}>
                        1. Agriculture
                    </Title>
                    <SubTitle sx={{ fontSize: fSubtitle }}>
                        Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy
                    </SubTitle>
                </Item>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Item >
                    <TextPro sx={{ fontSize: fText }}>
                        Top Likes

                    </TextPro>
                    <Title sx={{ fontSize: fTitle }}>
                        1. Education
                    </Title>

                    <SubTitle sx={{ fontSize: fSubtitle }}>
                        Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod
                    </SubTitle>
                    <Title sx={{ fontSize: fTitle }}>
                        2. Education
                    </Title>
                    <SubTitle sx={{ fontSize: fSubtitle }}>
                        Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod
                    </SubTitle>
                    <Title sx={{ fontSize: fTitle }}>
                        3. Education
                    </Title>
                    <SubTitle sx={{ fontSize: fSubtitle }}>
                        Lorem ipsum dolor sit amet, consetetur
                        sadipscing elitr, sed diam nonumy eirmod
                    </SubTitle>
                </Item>
            </Grid>

        </Grid>
    )
}

export default Boxing