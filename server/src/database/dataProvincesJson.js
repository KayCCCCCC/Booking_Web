const data = {
    provinces: [
        {
            "name": "An Giang",
            "lat": 10.5437,
            "lon": 105.1932
        },
        {
            "name": "Bà Rịa - Vũng Tàu",
            "lat": 10.3574,
            "lon": 107.1419
        },
        {
            "name": "Bắc Giang",
            "lat": 21.2712,
            "lon": 106.1951
        },
        {
            "name": "Bắc Kạn",
            "lat": 22.1477,
            "lon": 105.8566
        },
        {
            "name": "Bạc Liêu",
            "lat": 9.2851,
            "lon": 105.7129
        },
        {
            "name": "Bắc Ninh",
            "lat": 21.1861,
            "lon": 106.0604
        },
        {
            "name": "Bến Tre",
            "lat": 10.2369,
            "lon": 106.3653
        },
        {
            "name": "Bình Định",
            "lat": 13.786,
            "lon": 109.1963
        },
        {
            "name": "Bình Dương",
            "lat": 11.1303,
            "lon": 106.6061
        },
        {
            "name": "Bình Phước",
            "lat": 11.76,
            "lon": 106.9087
        },
        {
            "name": "Bình Thuận",
            "lat": 10.9337,
            "lon": 108.1088
        },
        {
            "name": "Cà Mau",
            "lat": 9.1777,
            "lon": 105.1263
        },
        {
            "name": "Cần Thơ",
            "lat": 10.0454,
            "lon": 105.7800
        },
        {
            "name": "Cao Bằng",
            "lat": 22.6661,
            "lon": 106.2470
        },
        {
            "name": "Đà Nẵng",
            "lat": 16.0471,
            "lon": 108.2022
        },
        {
            "name": "Đắk Lắk",
            "lat": 12.8321,
            "lon": 108.1278
        },
        {
            "name": "Đắk Nông",
            "lat": 12.0000,
            "lon": 107.7500
        },
        {
            "name": "Điện Biên",
            "lat": 21.3833,
            "lon": 103.0167
        },
        {
            "name": "Đồng Nai",
            "lat": 11.0324,
            "lon": 107.2038
        },
        {
            "name": "Đồng Tháp",
            "lat": 10.6100,
            "lon": 105.6567
        },
        {
            "name": "Gia Lai",
            "lat": 13.8333,
            "lon": 108.2167
        },
        {
            "name": "Hà Giang",
            "lat": 22.8333,
            "lon": 105.0200
        },
        {
            "name": "Hà Nam",
            "lat": 20.6167,
            "lon": 105.9167
        },
        {
            "name": "Hà Nội",
            "lat": 21.0285,
            "lon": 105.8412
        },
        {
            "name": "Hà Tĩnh",
            "lat": 18.3333,
            "lon": 106.3333
        },
        {
            "name": "Hải Dương",
            "lat": 20.9333,
            "lon": 106.3167
        },
        {
            "name": "Hải Phòng",
            "lat": 20.8431,
            "lon": 106.6625
        },
        {
            "name": "Hậu Giang",
            "lat": 9.7833,
            "lon": 105.6833
        },
        {
            "name": "Hòa Bình",
            "lat": 20.8179,
            "lon": 105.3397
        },
        {
            "name": "Hồ Chí Minh",
            "lat": 10.8231,
            "lon": 106.6297
        },
        {
            "name": "Hưng Yên",
            "lat": 20.6500,
            "lon": 106.0500
        },
        {
            "name": "Khánh Hòa",
            "lat": 12.2388,
            "lon": 109.1963
        },
        {
            "name": "Kiên Giang",
            "lat": 10.1333,
            "lon": 104.9000
        },
        {
            "name": "Kon Tum",
            "lat": 14.3500,
            "lon": 107.9833
        },
        {
            "name": "Lai Châu",
            "lat": 22.4000,
            "lon": 103.1500
        },
        {
            "name": "Lâm Đồng",
            "lat": 11.9404,
            "lon": 108.4419
        },
        {
            "name": "Lạng Sơn",
            "lat": 21.8500,
            "lon": 106.7333
        },
        {
            "name": "Lào Cai",
            "lat": 22.3667,
            "lon": 103.9667
        },
        {
            "name": "Long An",
            "lat": 10.6667,
            "lon": 106.0667
        },
        {
            "name": "Nam Định",
            "lat": 20.4167,
            "lon": 106.1833
        },
        {
            "name": "Nghệ An",
            "lat": 19.3333,
            "lon": 104.8333
        },
        {
            "name": "Ninh Bình",
            "lat": 20.2532,
            "lon": 105.9725
        },
        {
            "name": "Ninh Thuận",
            "lat": 11.8333,
            "lon": 108.8333
        },
        {
            "name": "Phú Thọ",
            "lat": 21.4247,
            "lon": 105.2158
        },
        {
            "name": "Phú Yên",
            "lat": 13.0882,
            "lon": 109.1651
        },
        {
            "name": "Quảng Bình",
            "lat": 17.5000,
            "lon": 106.3333
        },
        {
            "name": "Quảng Nam",
            "lat": 15.8797,
            "lon": 107.8474
        },
        {
            "name": "Quảng Ngãi",
            "lat": 15.1167,
            "lon": 108.5833
        },
        {
            "name": "Quảng Ninh",
            "lat": 21.0000,
            "lon": 107.3333
        },
        {
            "name": "Quảng Trị",
            "lat": 16.7500,
            "lon": 107.2000
        },
        {
            "name": "Sóc Trăng",
            "lat": 9.6036,
            "lon": 105.9797
        },
        {
            "name": "Sơn La",
            "lat": 21.3476,
            "lon": 104.0321
        },
        {
            "name": "Tây Ninh",
            "lat": 11.3013,
            "lon": 106.1655
        },
        {
            "name": "Thái Bình",
            "lat": 20.4500,
            "lon": 106.3333
        },
        {
            "name": "Thái Nguyên",
            "lat": 21.5928,
            "lon": 105.8441
        },
        {
            "name": "Thanh Hóa",
            "lat": 19.805,
            "lon": 105.7785
        },
        {
            "name": "Thừa Thiên Huế",
            "lat": 16.4600,
            "lon": 107.5900
        },
        {
            "name": "Tiền Giang",
            "lat": 10.3667,
            "lon": 106.3667
        },
        {
            "name": "Trà Vinh",
            "lat": 9.9167,
            "lon": 106.3500
        },
        {
            "name": "Tuyên Quang",
            "lat": 21.8167,
            "lon": 105.2167
        },
        {
            "name": "Vĩnh Long",
            "lat": 10.2500,
            "lon": 105.9667
        },
        {
            "name": "Vĩnh Phúc",
            "lat": 21.2967,
            "lon": 105.6113
        },
        {
            "name": "Yên Bái",
            "lat": 21.7225,
            "lon": 104.9117
        }
    ]
}

module.exports = data
