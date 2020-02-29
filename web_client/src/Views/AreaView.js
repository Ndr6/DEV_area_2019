import React from 'react';
import Header from '../Components/Header';
import ActionCard from "../Components/ActionCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function AreaView() {

    const actions = [
        {
            title: 'Action1',
            description: 'Description de l\'action 1 Lol elle est très bien',
            imageUrl: 'https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/149250811530100220-256.png',
        },
        {
            title: 'Action2',
            description: 'Description de l\'action 2 Lol elle est très bien',
            imageUrl: 'https://lh3.googleusercontent.com/proxy/9LXvHdyLWCOqyFjf1QcZtA8O93_-gSl6tRi6g_YHCT4QRLdZHdX6hTDJlJOscwhuUewEYiYCmQCon3VfthrVTCXNiYhx-NIdoH1d-bBgzxhfqND3SxynF7wQxHokpydx1PsERfzTHXDHnqb9WcTIuQ1O455mKEwbfA',
        },
        {
            title: 'Action3',
            description: 'Description de l\'action 3 Lol elle est très bien',
            imageUrl: 'https://static-s.aa-cdn.net/img/ios/985746746/3c4ea685f34faa70159e14b0c889fdd1'
        },
        {
            title: 'Action4',
            description: 'Description de l\'action 4 Lol elle est très bien',
            imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX/pQD/////ngD/oQD/owD/oAD/+fT/nQD///3/7NP/pgD/4r7//vr/+vH/t1D/vF3/+O7/79r/zo//5MP/xnr/16P/2Kj/9OX/rSv/xXf/uVb/zIn/6c3/267/qRP/05v/s0L/wGn/sDb/wW3/tkv/z5T/yYH/qyD/sDf/37b/x4T/ryzcdsqXAAAM+ElEQVR4nN1daXfqOgx0bKUQCIQd2rKWbtz+//93E6ALEI/kLJAw57xP9yXNYFmSpbGtPA6dYDHYdr+WLVUltJZf3e1gEXTY71fwX8PhaKa1MUR0a0oXiL/JGK0/RsMwM8P2RvumetROQcbXUTsLw85A6aqz+wZpGljN1cKwN9KVH72/IKMfew4Mm8/a3PqbnWH0c1PKsE3145fAUNp8vGQYRrWZf+cgHV361QuGgarnAB5gVMAxHDfqOoAHUGOMGY70rT8xN/QIMYz8W39fAfAjO8OnOk/BX5gnG8PoPgjGFKN0hqN7MNED/FEaw3H9ncwv9PiSYdC49VcVikZwzjBU9Y6D5yAVnjG8Gy/zjR9vc2TYvqdJeIBu/2XYrGCVIi+Imn8YPt+bjSYwz78Me/dnowl074fh4z0OYTyIo2+GnfscwngQO0eGg/scwngQB0eGd+hIDyB1YNi2Ztz6CN83ppqFbwZJTIwZRrYP19NObzrtB/N5e7J6e4zWrYRtQvWqn5kDtEkYhlY/ox+8c3T6w8lzNDN7otf81ozQYcxwaDfSS4ZHNKfD1fbQs7nm97rDH8YMR1ZPamd45NlfvL/4lS7/xyFReTPrB3IM9wiD1ZOpLEuaeQqEexHDPfrjqrLUDyoogmFisvPBrIIkdaAW9oTGiWGC6aSr/WqRNAsFUjZnhjHCXeRXiaQZqK39c7IwTEguXhuVMVfaqm7hDGN0xrOK9Fipq77KYBijP6qEtdJMLe3/mothjMVLBXqtSwWEQHkZxgO5vXkAgUKn/AwT0QpVwVgtKIJhjMmyAsaajoIYet5uVlGOhTH0vHY1ORbI0POGVeRYKMPYVpeV8zkFM4x9jqlGovODwhlWTjBXPEPP61VKU1YGQ8+bz6qjiCiHoeeN/aqYalkMvU5VTLU0hnF0bFViGHWq5rYYNB+rIIKkaLPZbB/f38aL9rzfKZjvfFmBYSTab2qI4Wutzcd6O9gFFsF4BmyrMIwnSOjGVP314yQoZIoOqyooP+xV2U76uSmG3Qo32BOafnd1Iat2xLgiccMGMpqiSa6Z2a+Cw8GIWc4GOYayGVXYUr8Rk2z9y06y6pZ6QExyOcjqeoKaKANiki8LvBfQhs5L5SfjEeT722zWuqnBZDwi9juLLBTf6kMxHkgaZEh52rXwN0fEM3I0dabYr4m/OcLojTPH3rJWFJVpOHMMa+NSjzB665rQvdaMYrI31zFA1m/3nDHnOx4ZbGtHkfyPuRPFxxoFxiNIR07T8b1+FJXxnUy1jhSVP3NZd9SSIumBA8XH2rmbBP6HwzDWz6MmIP0mp1jT3YL+Wu5Ur5PdmMNGi2SnRTE5MRl0Vs4pXq6Qhptde7cYr97+bbqfh60W+YnqRynD8AorjdPu2jRYDDb7nRa5/rJ5kVpqr/z1Ylr/MOzvntc6jx6PjDSL65ceFu0d0v44oswsqbESUix9dzLuAfdX60ZGCZDeCCmWXZ5iu9ydXWQykTSfwmXjptyYIenjh+0oi7lSS1jhKDdmCJUKncmnu9KJjKxy3CnVoTrsCho572IjvRO9GuzpyQ8XtUnorgRuTERvXpVI0VFPM1w7chRm4iUm4c6KoaDrpq7Qz5K3NstL3zJoooKu0zjqd8lLy8ttMqm+gk8XjjKKpR1/lFHX1l46LNBlFLslTcXMyj0XeaVoLoYlRcUce9c2clMVedRhOadY5VFfOujytCQubkux03z60mfxMDYEpY1yQkZOBW3/Q/q7a0GOOi/DTnNrhN+FCQD5gpVGGccE5VdBz4XySmrx68Vmq3g7LUDnLZVX0if/rmHxcb8QJfubzOGYDf+q4lPwYrT6c9nKUfPlqU7hzYyCdiP0ZqLfvsEXGcdFUyxsv8WT5MvI8KVi+zksGRlmExqmQNTypBf2PfOCnY1ZTSaL3bA/zc9UtP4xI/Y9RTub/U6LZKsFzaLnxZy/LcMOkS5Ps+lbeecfHm7LaG3GQdadM3MJRX4qlnyGZcxTm+44m9i5L4gatObe0rxC4zSRrb+7iYAOmAoo+uxicXKVDv+epPtISihq9rXXkmjGJD/Grj5WQJE+uJfsrie2IeM/OipI+7y78Vndzcc1dbam8eQmzReEbNZOr3yqM+lXJ47859GMe0fRuRv7Rbrr4nT47IaV+V3/aG7SW4d055119z4X9689iCqRFknFB57gFg0TMW+4ojv9hf8hn47sEGguobjJtgU6v9/Fjh6nbmCD4nUSmwuYlnQY2ZjBOpsbba+Rq2QHzBgQMenSzQ7o9tdCp8ppKw3TkbrdOflEMktl22WaiRibm22RIi2T5XNtCMOoNEsVoTAQKkjfGTvVTFJ/DYGtDX5XRJFZInBF8MUtte5mJlk4cgqLBh7E5k3V/PQhcalMUYkbxNteykFKInVmci9mJt7S16ikISigyKQ2XIH4qmv9S5ASGCqjj9X4FeMSzfRw8hDehEFL3t0w7TKDS4u9ku5RI6P9WXf7/m9/3wXYmsBXIzxvBSkS4adfSzBT8k3092ihzhAcNW8EcRE7Gx+LbIsPiaSf2pdti+lAWdZ7Pp/d4JILYwYPBTMk+xkCC4tWT5CjfsJBZIQ2T4WaqV6jitoqvdTLS4FwxDBb+HCRZkqc+Kz3mvbXiNiYAU69j+FDh/xQXNA3S758P0hz3ny7DN+d6eOTYArzpuaV5eclip6Uv8e3IeBXMr39SUFBn61fHhGkUWSnIs4vcXI6LcZMTy8Qdv1YanFPrdEgGmwDheSmEsnZN9opk4pVWEC9Gi3hs0W09YlcdENpZULWTmFig58uQmDDVthPkeI3+Ao2GghcVyxgpS9Q8ZwgrZDJtW1CxJAxUxxOBSDlqp9JWy74TNy3X4ymuJ5w7kUiE3HTkDKrmOQLF6WwN827Y4gxkVSkJYtcbx4VP5kFRs4xNLItgqdIueGbmKUi9DW4wJ9zIposqsS0vhATMeBttvhnXuUaxOSSS3ekpVLEZLZopUcwacwXEX35OR1/kdbFZgZxh+IaLNfYLxmVoJFNOptmpoST2xAxxL9OnhaNS0b6F6k3mzJtCOuFtirRKqMnYTBlYES7Hy+R6jeYhiAyUzz+4AJHnmGWWJEgdf8O9ssdtNT30ZN5Yr6fRSebIHXFx/xeqOgGE4ZmDoa8mtWC1EnF5CZvwNgMzB1zaMA4tYAV6a09/IOhYgbOa8EtnCzDrHtm/qUyNP/gQyjmwxVmjqwm8ximqxCYig2KF7Bsar92m2foftrxARa7weUCtNKDMT9HwU2yPTcVlnwfx1c4EZEfzrEFI2NaavVujJkihrCWkt2Z4mwJwDYxsDcFdVPcHMjegsLLFjusWQY+UxjVPg16MN11yyhmY2jNFPFSH6Wm0K3n6F5kTGrsft+gyh1KMKHTa2cPF9kmIvBt8ENR2RR29HPk3hI5xSXAT4onImizwJJiHjltJjMF1S9c+AGqWIKZaQ6GWUpRKMXAERGIt3G4yHOeRIbEDeqToZALrNZx7o0FHRjuIRFPe+hqYN6GvDBK2pm7x52ba0xHF69lkX3DlRySmrbUEjN07VxMGEUl6gaiegT0eWj3xVJ9MTbM9Y1Owa1ksNWndDx+GCLzBmtg+lJsZ0O7NNi4LVdYPQKKu3CdA9I26iq+yuEwFfljxmGqC35tOIFBjkFbJdhBJF4JC06tgKeJgEADs6E5yKIGSlAyJuEoslsnFRNgwTII6oVB/8kslEjyLjk07uFTsoiBPhHUTGEFBHDQgYLNyd//kfWoc9mWQFhHBz4Rtj1AlqEflLDKYZbQUpsj4Ql7cBkEym0waNljVLw6UtLuFOnIPoUW4mtvoU9EiekmE0MzihmKC6oxx1SnGk5a8mPLYV0Q1DEgQ/sC0R/GDB3axKRnqzNPEbY3TgddQ4YoriGGdl+imzFDJjM/+0PJ9birdjDtPfT688n7p+vR+mYVPlixA1YaNe3PWa00+V2U+yEM+6ur9f5GjwznzRttB9S3gefsQ9jeM7zV1u/yQQm75L+bbf0uG/v6lYITtebY10wShjfejlkaDv0cheNJrXFoBewZln3O221wrJgcGDbv0J0SNf8wvMHBRKXj+xDGI8O63uRmx89Gn2+GIahz1RGkwjOGzB6y2qHxswz6YVjeJRK3wJ/dq78MvVEt741Mhf9Hu/GH4f14m5PthH8ZisqBNcDpdsIThjW8FTsF/mlv5JRhPW/iPcX5uXFnDL2x241NlQM1zsv/5wy9QNV5Mhp1UQ68YOiFkesFapUB6eiy8XPJME7DxfXdasFQWpMxjaHXfHa/0PDmMPo5Vc2QytDzOqM818VeH2T0yCLuszCMOQ5UbeYjaRpYhTpWhjHam7zXG18BSX06Qk1+xDD2q8P3ma+5I6FuAzrcZvAxGuLN2Jhhgodg8bbtzpaMtOjKaC2/utvBIuBPFPsPHJSoM14DLo8AAAAASUVORK5CYII='
        },
        {
            title: 'Action1',
            description: 'Description de l\'action 1 Lol elle est très bien',
            imageUrl: 'https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/149250811530100220-256.png',
        },
        {
            title: 'Action2',
            description: 'Description de l\'action 2 Lol elle est très bien',
            imageUrl: 'https://lh3.googleusercontent.com/proxy/9LXvHdyLWCOqyFjf1QcZtA8O93_-gSl6tRi6g_YHCT4QRLdZHdX6hTDJlJOscwhuUewEYiYCmQCon3VfthrVTCXNiYhx-NIdoH1d-bBgzxhfqND3SxynF7wQxHokpydx1PsERfzTHXDHnqb9WcTIuQ1O455mKEwbfA',
        },
        {
            title: 'Action3',
            description: 'Description de l\'action 3 Lol elle est très bien',
            imageUrl: 'https://static-s.aa-cdn.net/img/ios/985746746/3c4ea685f34faa70159e14b0c889fdd1'
        },
        {
            title: 'Action4',
            description: 'Description de l\'action 4 Lol elle est très bien',
            imageUrl: 'data:image/png;base64,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'
        },
        {
            title: 'Action1',
            description: 'Description de l\'action 1 Lol elle est très bien',
            imageUrl: 'https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/149250811530100220-256.png',
        },
        {
            title: 'Action2',
            description: 'Description de l\'action 2 Lol elle est très bien',
            imageUrl: 'https://lh3.googleusercontent.com/proxy/9LXvHdyLWCOqyFjf1QcZtA8O93_-gSl6tRi6g_YHCT4QRLdZHdX6hTDJlJOscwhuUewEYiYCmQCon3VfthrVTCXNiYhx-NIdoH1d-bBgzxhfqND3SxynF7wQxHokpydx1PsERfzTHXDHnqb9WcTIuQ1O455mKEwbfA',
        },
        {
            title: 'Action3',
            description: 'Description de l\'action 3 Lol elle est très bien',
            imageUrl: 'https://static-s.aa-cdn.net/img/ios/985746746/3c4ea685f34faa70159e14b0c889fdd1'
        },
        {
            title: 'Action4',
            description: 'Description de l\'action 4 Lol elle est très bien',
            imageUrl: 'data:image/png;base64,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'
        },
    ];

    let actionsList = [];
    let actualActions = [];

    for (let i = 0; i < actions.length; i++) {
        if ((i % 4 === 0 && i !== 0)) {
            console.log(actualActions);
            actionsList.push(actualActions);
            actualActions = [];
        }
        actualActions.push(
            <Grid key={actions[i].title} item>
                <ActionCard action={actions[i]} image={actions[i].imageUrl} />
            </Grid>
        );
    }
    actionsList.push(actualActions);
    console.log(actionsList);

    return (
        <>
            <Header />
            <Grid justify={"flex-start"} style={{height: '100%', textAlign: 'center'}} wrap={"nowrap"} container direction={"column"}>
                <Typography variant={"h1"}>
                    Choose an action
                </Typography>
                    {actionsList.map((e, index) => (
                            <Grid style={{margin: '5px'}} spacing={3} item key={index} justify={"center"} container direction={"row"}>
                                {e}
                            </Grid>
                    ))}
            </Grid>
        </>
    )
}
