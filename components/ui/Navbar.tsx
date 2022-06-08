import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCart,
} from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
  Input,
} from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import React, { useContext, useState } from 'react';
import { UiContext } from '../../context';

export const Navbar = () => {
  const { route, ...router } = useRouter();

  const { toggleMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    setIsSearchVisible(false);
    router.push(url);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display={'flex'} alignItems={'center'}>
            <Typography variant='h6' component='h6'>
              Teslo |
            </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={isSearchVisible ? 0 : 1}></Box>

        <Box
          className='fadeIn'
          sx={{
            display: isSearchVisible
              ? 'none'
              : {
                  xs: 'none',
                  sm: 'block',
                },
          }}>
          <NextLink href='/category/men' passHref>
            <Link>
              <Button
                color={route.includes('/category/men') ? 'primary' : 'info'}>
                Men
              </Button>
            </Link>
          </NextLink>

          <NextLink href='/category/women' passHref>
            <Link>
              <Button
                color={route.includes('/category/women') ? 'primary' : 'info'}>
                Women
              </Button>
            </Link>
          </NextLink>

          <NextLink href='/category/kid' passHref>
            <Link>
              <Button
                color={route.includes('/category/kid') ? 'primary' : 'info'}>
                Children
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={isSearchVisible ? 0 : 1}></Box>

        {/* Pantallas pequeñas */}
        <IconButton
          sx={{
            display: {
              xs: 'flex',
              sm: 'none',
            },
          }}
          onClick={toggleMenu}>
          <SearchOutlined />
        </IconButton>

        {/* Pantallas grandes */}

        {isSearchVisible ? (
          <Input
            sx={{
              flex: 1,
              mx: 10,
              display: {
                xs: 'none',
                sm: 'flex',
              },
            }}
            className='fadeIn'
            autoFocus
            onBlur={() => setIsSearchVisible(false)}
            type='text'
            placeholder='Buscar...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setSearchTerm('')}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              },
            }}
            onClick={() => setIsSearchVisible(true)}
            className='fadeIn'>
            <SearchOutlined />
          </IconButton>
        )}

        <NextLink href='/cart' passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={4} color={'secondary'}>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
