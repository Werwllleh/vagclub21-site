'use client'

import styled from "styled-components";
import {customTheme} from "@/styles/theme";

// отступы сверху/снизу дают утилитарные классы .ppt/.ppb (передаются через className),
// здесь только фон раздела
const AdminSection = styled.section`
    background-color: ${customTheme.color.greyLight};
`

export default AdminSection;
